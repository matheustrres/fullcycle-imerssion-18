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

import { CreateEventDto } from './dto/create-event.dto';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/reserve')
  async reserveSpots(
    @Body() reserveSpotDto: ReserveSpotDto,
    @Param('id') eventId: string,
  ) {
    const reservedSpots = await this.eventsService.reserveSpot(
      reserveSpotDto,
      eventId,
    );

    return reservedSpots;
  }
}
