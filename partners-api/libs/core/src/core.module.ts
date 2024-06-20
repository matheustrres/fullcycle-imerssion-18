import { Module } from '@nestjs/common';

import { CoreService } from './core.service';
import { EventsCoreModule } from './events/events-core.module';
import { SpotsCoreModule } from './spots/spots-core.module';

@Module({
  imports: [EventsCoreModule, SpotsCoreModule],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
