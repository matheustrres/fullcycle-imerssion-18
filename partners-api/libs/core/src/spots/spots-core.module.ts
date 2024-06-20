import { Module } from '@nestjs/common';

import { SpotsCoreService } from './spots-core.service';

@Module({
  providers: [SpotsCoreService],
})
export class SpotsCoreModule {}
