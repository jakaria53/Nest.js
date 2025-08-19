import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class UpdateStudentDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
}

export class CreateProfileDto {
  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class UpdateProfileDto {
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsString()
  address?: string;
}
