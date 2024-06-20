import { Module } from '@nestjs/common';

import { EventsCoreService } from './events-core.service';

@Module({
  providers: [EventsCoreService],
})
export class EventsCoreModule {}
