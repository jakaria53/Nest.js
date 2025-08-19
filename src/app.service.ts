import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getPhotoById(photoid:number):string{
    return"photo id:"+photoid;
  }
}
