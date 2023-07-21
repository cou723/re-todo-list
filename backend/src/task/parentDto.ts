import { IsNumber } from 'class-validator';

export class ParentDto {
  @IsNumber()
  newParent: number;
}
