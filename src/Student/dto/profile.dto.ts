import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateProfileDto {
  @IsNumber()
  age: number;

  @IsNotEmpty()
  address: string;

}

export class UpdateProfileDto {
  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  address?: string;
}
