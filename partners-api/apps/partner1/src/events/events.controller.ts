import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { CreateEventRequest } from './request/create-event.request';
import { ReserveSpotRequest } from './request/reserve-spot.request';
import { UpdateEventRequest } from './request/update-event.request';

import { EventsCoreService } from '@app/core/events/events-core.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsCoreService: EventsCoreService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createEventRequest: CreateEventRequest) {
    return this.eventsCoreService.create(createEventRequest);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.eventsCoreService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsCoreService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventRequest: UpdateEventRequest,
  ) {
    return this.eventsCoreService.update(id, updateEventRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsCoreService.remove(id);
  }

  @Post(':id/reserve')
  async reserveSpots(
    @Body() reserveSpotRequest: ReserveSpotRequest,
    @Param('id') eventId: string,
  ) {
    const reservedSpots = await this.eventsCoreService.reserveSpot(
      reserveSpotRequest,
      eventId,
    );

    return reservedSpots;
  }
}
