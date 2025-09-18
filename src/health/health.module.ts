import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { HealthController } from './health.controller';

@Module({
  imports: [
    HttpModule,
    TerminusModule.forRoot({
      gracefulShutdownTimeoutMs: 1000,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/NewEmployeeDb'),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
