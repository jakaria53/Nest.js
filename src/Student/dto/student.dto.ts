import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsNumber,IsInt,Min, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  @IsNotEmpty() gender: string;
  @IsNotEmpty() phone: string;
   @IsInt()
  @Min(1)
  age: number;
    @IsNotEmpty()
  address: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

   @MinLength(6, { message: 'Confirm Password must be at least 6 characters long' })
  confirmPassword: string;
}

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  phone?: string;
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
