import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { UserModule } from '../user/user.module';
import { UserDataSchema } from './schema/user-data.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserData', schema: UserDataSchema },
    ]),
    UserModule,
  ],
  controllers: [UserDataController],
  providers: [UserDataService],
})
export class UserDataModule {}
