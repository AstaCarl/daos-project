import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // Get all musicians
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

//   // Find a musician by id
//   async findOne(id: string): Promise<Musician> {
//     return this.musicianModel.findById(id).exec();
//   }

  // Create a musician
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

//   // Delete a musician
//   async deleteMusician(id: string) {
//     await this.musicianModel.findByIdAndDelete(id).exec();
//   }

//   // Update a musician
//   async updateMusician(id: string, updateMusicianDto: CreateMusicianDto) {
//     await this.musicianModel.findByIdAndUpdate(id, updateMusicianDto).exec();
//   }

async findOne(email: string): Promise<User | undefined> {
  return this.userModel.findOne({email}).exec();
}

}