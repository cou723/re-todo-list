import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

import { TaskEntity } from '@/entity/task.entity';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService],
})
export class TaskModule {}
