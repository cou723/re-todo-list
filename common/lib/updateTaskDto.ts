import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export interface IUpdateTaskDto {
  title?: string;
  description?: string;
  parent?: number;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsNumber()
  @IsOptional()
  readonly parent: number;
}
