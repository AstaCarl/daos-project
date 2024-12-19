import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    // private usersService: UsersService,
  ) {}

  // Login route
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    // calls the signIn method from the auth service and sends the email and password from the request body
    return this.authService.signIn(signInDto.email, signInDto.password);
  };
}
