import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//decorator that defines the class as a controller
@Controller()
export class AppController {
  // Constructor takes the AppService helper and stores it in a private readonly variable, (private, the variable is only accessible within the class, 
  // readonly, the variable cannot be reassigned)
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //calls the getHello() method from the AppService class
    return this.appService.getHello();
  }
}
