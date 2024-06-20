import { Module } from '@nestjs/common';

import { EventsCoreService } from './events-core.service';

@Module({
  providers: [EventsCoreService],
  exports: [EventsCoreService],
})
export class EventsCoreModule {}
