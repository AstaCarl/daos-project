import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schema/user.schema';
import { InstrumentsModule } from '../instruments/instruments.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    InstrumentsModule,
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
