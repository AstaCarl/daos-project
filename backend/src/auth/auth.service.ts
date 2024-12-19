import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // login method, takes email and password as arguments
  async signIn(
    email: string,
    password: string,
    // promise to return a message, access token, and user object
  ): Promise<{ message: string; access_token: string; user: any }> {
    // find the user by email
    const user = await this.usersService.findByEmail(email);

    // if password is incorrect, throw an UnauthorizedException
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    // define the payload with the user's email
    const payload = { email: user.email };
    return {
      message: `User signed in successfully!`,
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
