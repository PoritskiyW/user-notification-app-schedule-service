import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
