import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { Profile } from './profile.entity';
import { CreateStudentDto, UpdateStudentDto, CreateProfileDto, UpdateProfileDto } from './dto/student.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    private jwtService: JwtService, ) {} async createStudent(dto: CreateStudentDto): Promise<Student> { const hashedPassword = await bcrypt.hash(dto.password, 10);
    const student = this.studentRepo.create({ ...dto, password: hashedPassword });
    return this.studentRepo.save(student);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const student = await this.studentRepo.findOne({ where: { email } });
    if (!student || !(await bcrypt.compare(password, student.password))) {
      throw new BadRequestException('Invalid email or password');
    }
    const payload = { id: student.id, email: student.email };
    return { token: await this.jwtService.signAsync(payload, { secret: 'student_jwt_secret_key' }) };
  }

  async createProfile(studentId: number, dto: CreateProfileDto): Promise<Profile> {
    const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['profile'] });
    if (!student) throw new NotFoundException('Student not found');
    if (student.profile) throw new BadRequestException('Profile already exists');

    const profile = this.profileRepo.create(dto);
    profile.student = student;
    student.profile = profile;

    await this.studentRepo.save(student);
    return this.profileRepo.save(profile);
  }

  async getStudentWithProfile(studentId: number): Promise<Student> {
    const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['profile'] });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async updateProfile(studentId: number, dto: UpdateProfileDto): Promise<Profile> {
    const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['profile'] });
    if (!student?.profile) throw new NotFoundException('Profile not found');

    Object.assign(student.profile, dto);
    return this.profileRepo.save(student.profile);
  }

  async deleteProfile(studentId: number): Promise<{ message: string }> {
    const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['profile'] });
    if (!student?.profile) throw new NotFoundException('Profile not found');

    await this.profileRepo.delete(student.profile.id);
    return { message: 'Profile deleted successfully' };
  }

  async updateStudent(studentId: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.studentRepo.findOne({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');

    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }

  async deleteStudent(studentId: number): Promise<{ message: string }> {
    const student = await this.studentRepo.findOne({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');

    await this.studentRepo.delete(studentId);
    return { message: 'Student deleted successfully' };
  }
}
