import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EventsModule } from './events/events.module';
import { SpotsModule } from './spots/spots.module';

import { PrismaModule } from '@app/core/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.partner2',
      cache: false,
    }),
    PrismaModule,
    EventsModule,
    SpotsModule,
  ],
})
export class Partner2Module {}
