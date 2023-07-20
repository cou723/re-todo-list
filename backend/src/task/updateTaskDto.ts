import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNumber()
  @IsOptional()
  readonly newParent: number;
}
