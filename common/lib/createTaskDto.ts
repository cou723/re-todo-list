import { IsNumber, IsOptional, IsString } from 'class-validator';

export interface ICreateTaskDto {
  title: string;
  description: string;
  parentId?: number;
}

export class CreateTaskDto implements ICreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
