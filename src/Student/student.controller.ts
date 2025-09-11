import { Controller, Post, Body, Param, Get, Put, Delete, UsePipes, ValidationPipe, Patch, UseGuards, BadRequestException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto, CreateProfileDto, UpdateProfileDto } from './dto/student.dto';
import { StudentGuard } from './student.guard';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  createStudent(@Body() dto: CreateStudentDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return this.studentService.createStudent(dto);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.studentService.login(body.email, body.password);
  }

  @UseGuards(StudentGuard)
  @Get(':id')
  getStudent(@Param('id') id: number) {
    return this.studentService.getStudentWithProfile(id);
  }


  @Post(':id/profile')
  createProfile(@Param('id') id: number, @Body() dto: CreateProfileDto) {
    return this.studentService.createProfile(id, dto);
  }

  @UseGuards(StudentGuard)
  @Put(':id/profile')
  updateProfile(@Param('id') id: number, @Body() dto: UpdateProfileDto) {
    return this.studentService.updateProfile(id, dto);
  }

  @UseGuards(StudentGuard)
  @Delete(':id/profile')
  deleteProfile(@Param('id') id: number) {
    return this.studentService.deleteProfile(id);
  }

  
  @Patch(':id')
  updateStudent(@Param('id') id: number, @Body() dto: UpdateStudentDto) {
    return this.studentService.updateStudent(id, dto);
  }

  @UseGuards(StudentGuard)
  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
