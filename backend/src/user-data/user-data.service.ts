import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData } from './schema/user-data.schema';

@Injectable()
export class UserDataService {
  constructor(
    @InjectModel('UserData') private userDataModel: Model<UserData>,
  ) {}
  create(createUserDataDto: CreateUserDataDto, userId: any) {
    const createdUserData = new this.userDataModel(createUserDataDto);
    createdUserData.user = userId;
    return createdUserData.save();
  }

  findOne(userId: any) {
    return this.userDataModel.findOne({ user: userId }).exec();
  }

  async update(
    id: string,
    updateUserdataDto: UpdateUserDataDto,
    userId: any,
  ): Promise<UserData> {
    const userData = await this.userDataModel.findById(id).exec();
    if (!userData) {
      throw new Error('User data not found');
    }
    if (userData.user != userId) {
      throw new UnauthorizedException();
    }
    Object.assign(userData, updateUserdataDto);
    return userData.save();
  }

  remove(id: number) {
    return `This action removes a #${id} userData`;
  }
}
