import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 20, { message: 'Name is too short or too long' })
  name: string;
  @IsString()
  description: string;
  @IsInt()
  @IsPositive()
  area: number;
}
