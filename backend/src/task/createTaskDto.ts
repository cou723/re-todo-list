import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Task } from '../entity/task.entity';

export class CreateTaskDto {
  @IsString()
  title: Task['title'];

  @IsString()
  description: Task['description'];

  @IsOptional()
  @IsNumber()
  parent: null | Task['id'];
}
