import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
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
}
