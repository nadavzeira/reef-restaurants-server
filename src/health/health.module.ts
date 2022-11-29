import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule],
  exports: [HealthController],
  controllers: [HealthController],
  providers: [HealthController],
})
export class HealthModule {}