import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateSpotRequest } from './request/create-spot.request';
import { UpdateSpotRequest } from './request/update-spot.request';

import { SpotsCoreService } from '@app/core/spots/spots-core.service';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsCoreService: SpotsCoreService) {}

  @Post()
  create(
    @Body() createSpotRequest: CreateSpotRequest,
    @Param('eventId') eventId: string,
  ) {
    return this.spotsCoreService.create({
      ...createSpotRequest,
      eventId,
    });
  }

  @Get()
  async findAll(@Param('eventId') eventId: string) {
    return this.spotsCoreService.findAll(eventId);
  }

  @Get(':spotId')
  findOne(@Param('eventId') eventId: string, @Param('spotId') spotId: string) {
    return this.spotsCoreService.findOne(eventId, spotId);
  }

  @Patch(':id')
  update(
    @Param('eventId') eventId: string,
    @Param('spotId') spotId: string,
    @Body() updateSpotRequest: UpdateSpotRequest,
  ) {
    return this.spotsCoreService.update(eventId, spotId, updateSpotRequest);
  }

  @Delete(':spotId')
  remove(@Param('eventId') eventId: string, @Param('spotId') spotId: string) {
    return this.spotsCoreService.remove(eventId, spotId);
  }
}
