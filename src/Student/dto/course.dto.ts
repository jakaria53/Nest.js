import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Course title is required' })
  title: string;
}

export class UpdateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Course title is required' })
  title: string;
}
