import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto, UpdateCourseDto } from '../dto/course.dto';
import { Student } from '../student.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(Student) private studentRepo: Repository<Student>
  ) {}

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepo.find({ relations: ['student'] });
  }

  async createCourse(studentId: number, dto: CreateCourseDto): Promise<Course> {
    const student = await this.studentRepo.findOne({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const course = this.courseRepo.create({ ...dto, student });
    return this.courseRepo.save(course);
  }

  async updateCourse(courseId: number, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }

  async deleteCourse(courseId: number): Promise<{ message: string }> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    await this.courseRepo.delete(courseId);
    return { message: 'Course deleted successfully' };
  }
}
