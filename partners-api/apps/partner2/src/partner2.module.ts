import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EventsModule } from './events/events.module';
import { SpotsModule } from './spots/spots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.partner1',
      cache: true,
    }),
    EventsModule,
    SpotsModule,
  ],
})
export class Partner2Module {}
