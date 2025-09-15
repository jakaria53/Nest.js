import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from '../dto/course.dto';
import { StudentGuard } from '../student.guard';
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(StudentGuard)
  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @UseGuards(StudentGuard)
  @Post(':studentId')
  createCourse(@Param('studentId') studentId: number, @Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(studentId, dto);
  }

  @UseGuards(StudentGuard)
  @Put(':id')
  updateCourse(@Param('id') id: number, @Body() dto: UpdateCourseDto) {
    return this.courseService.updateCourse(id, dto);
  }

  @UseGuards(StudentGuard)
  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.courseService.deleteCourse(id);
  }
}
