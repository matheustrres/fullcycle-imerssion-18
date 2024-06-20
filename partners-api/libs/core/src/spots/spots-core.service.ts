import { BadRequestException, Injectable } from '@nestjs/common';
import { Spot, SpotStatus } from '@prisma/client';

import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

import { PrismaService } from '../prisma/prisma.service';

type CreateSpotInput = CreateSpotDto & {
  eventId: string;
};

@Injectable()
export class SpotsCoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSpotInput: CreateSpotInput): Promise<Spot> {
    const event = await this.prismaService.event.findFirst({
      where: {
        id: createSpotInput.eventId,
      },
    });

    if (!event) {
      throw new BadRequestException('Event not found.');
    }

    return this.prismaService.spot.create({
      data: {
        ...createSpotInput,
        status: SpotStatus.AVAILABLE,
      },
    });
  }

  async findAll(eventId: string): Promise<Spot[]> {
    return this.prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  async findOne(eventId: string, spotId: string): Promise<Spot | null> {
    return this.prismaService.spot.findFirst({
      where: {
        id: spotId,
        eventId,
      },
    });
  }

  async update(
    eventId: string,
    spotId: string,
    updateSpotDto: UpdateSpotDto,
  ): Promise<Spot | null> {
    return this.prismaService.spot.update({
      where: {
        id: spotId,
        eventId,
      },
      data: updateSpotDto,
    });
  }

  async remove(eventId: string, spotId: string): Promise<Spot> {
    return this.prismaService.spot.delete({
      where: {
        id: spotId,
        eventId,
      },
    });
  }
}
