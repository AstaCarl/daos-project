import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';

// use dotenv to access environment variables
dotenv.config();

// The AuthGuard class implements the CanActivate interface, which requires the implementation of the canActivate method.
// This guard is used to protect routes by determining whether a request should be allowed to proceed.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request object from the context object
    const request = context.switchToHttp().getRequest();
    // Extract the token from the request header
    const token = this.extractTokenFromHeader(request);
    // If no token is found, throw an UnauthorizedException
    if (!token) {
      throw new UnauthorizedException();
    }
    // Verify the token and extract the payload
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // Attach the user object to the request object, email is saved in the payload
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Extract the token from the Authorization header
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // If the type is Bearer, return the token, otherwise return undefined
    return type === 'Bearer' ? token : undefined;
  }
}
