import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Event, Prisma, TicketStatus } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }

  async findAll(): Promise<Event[]> {
    return this.prismaService.event.findMany();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.prismaService.event.update({
      where: {
        id,
      },
      data: updateEventDto,
    });
  }

  async remove(id: string): Promise<Event> {
    return this.prismaService.event.delete({
      where: {
        id,
      },
    });
  }

  // SELECT * FROM spots WHERE name in ('A1', 'A2')
  async reserveSpot(reserveSpotDto: ReserveSpotDto, eventId: string) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId,
        name: {
          in: reserveSpotDto.spots,
        },
      },
    });

    if (spots.length !== reserveSpotDto.spots.length) {
      const foundSpotsName = spots.map((spot) => spot.name);
      const notFoundSpots = reserveSpotDto.spots.filter(
        (spotName) => !foundSpotsName.includes(spotName),
      );

      throw new BadRequestException(
        `Spots ${notFoundSpots.join(', ')} not found.`,
      );
    }

    try {
      const tickets = await this.prismaService.$transaction(
        async (prisma) => {
          await prisma.reservationHistory.createMany({
            data: spots.map((spot) => ({
              spotId: spot.id,
              ticketKind: reserveSpotDto.ticketKind,
              email: reserveSpotDto.email,
              status: TicketStatus.RESERVED,
            })),
          });

          await prisma.spot.updateMany({
            where: {
              id: {
                in: spots.map((spot) => spot.id),
              },
            },
            data: {
              status: TicketStatus.RESERVED,
            },
          });

          const tickets = await Promise.all(
            spots.map((spot) =>
              prisma.ticket.create({
                data: {
                  spotId: spot.id,
                  ticketKind: reserveSpotDto.ticketKind,
                  email: reserveSpotDto.email,
                },
              }),
            ),
          );

          return tickets;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
        },
      );

      return tickets;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': // unique constraint violation
          // throw new BadRequestException('Spot already reserved.');
          case 'P2034': // transaction conflict
            throw new ConflictException('Some spots are already reserved.');
        }

        throw error;
      }
    }
  }
}
