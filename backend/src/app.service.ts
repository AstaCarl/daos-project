import { Injectable } from '@nestjs/common';

// example of a how a service works

//Injectable decorator is used to define a class as a provider, you can inject it into other classes
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
