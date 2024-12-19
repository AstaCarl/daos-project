import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schema/user.schema';
import { InstrumentsModule } from '../instruments/instruments.module';


// The @Module decorator defines the UserModule, organizing related components
@Module({
  imports: [
    // MongooseModule.forFeature() is used to define the schema for the User model
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // import the InstrumentsModule
    InstrumentsModule,
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
