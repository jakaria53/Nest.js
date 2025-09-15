import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Course } from './course/course.entity'; // Import Course

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.student, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Course, (course) => course.student, { cascade: true })
  courses: Course[]; // Proper TypeORM relation
}
