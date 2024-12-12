import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Sign in method
  async signIn(
    email: string,
    password: string,
  ): Promise<{ message: string; access_token: string; user: any }> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };
    return {
      message: `User signed in successfully!`,
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
