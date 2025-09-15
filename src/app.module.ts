import { Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { StudentModule } from './Student/student.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './Student/course/course.module';
 
 @Module({
 imports: [StudentModule, CourseModule,TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: 'jakaria123',
 database: 'project',
 autoLoadEntities: true,
 synchronize: true,

 } ),
 ],
 controllers: [AppController],
 providers: [AppService],
 })
 export class AppModule {}