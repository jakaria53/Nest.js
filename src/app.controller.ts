import { Controller, Get,Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
   getHello(): string {
    return this.appService.getHello(); // ekhane "Hello World!" return hobe
  }
  constructor(private readonly appService: AppService) {}



}
