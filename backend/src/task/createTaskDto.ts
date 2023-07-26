import { IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskEntity } from '../entity/task.entity';

export class CreateTaskDto {
  @IsString()
  title: TaskEntity['title'];

  @IsString()
  description: TaskEntity['description'];

  @IsOptional()
  @IsNumber()
  parent: null | TaskEntity['id'];
}
