import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Profile } from './profile.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { JwtModule } from '@nestjs/jwt';
import { Course } from './course/course.entity'; // Add Course

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Profile, Course]), // Include Course
    JwtModule.register({
      global: true,
      secret: 'student_jwt_secret_key', 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
