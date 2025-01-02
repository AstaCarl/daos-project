import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    // import JwtModule
    JwtModule.register({
      global: true, // makes the JWT module globally available
      secret: process.env.JWT_SECRET, // secret key for signing JWT token
      signOptions: { expiresIn: '24h' }, // token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
