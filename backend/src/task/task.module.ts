import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskEntity } from '../entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
