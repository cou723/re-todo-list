import { IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskEntity } from '../entity/task.entity';

export interface ICreateTaskDto {
  title: TaskEntity['title'];
  description: TaskEntity['description'];
  parentId?: TaskEntity['id'];
}

export class CreateTaskDto implements ICreateTaskDto {
  @IsString()
  title: TaskEntity['title'];

  @IsString()
  description: TaskEntity['description'];

  @IsOptional()
  @IsNumber()
  parentId?: TaskEntity['id'];
}
