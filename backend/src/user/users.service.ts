import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMyInstrumentDto } from 'src/my_instruments/dto/create-my_instrument.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async linkMyInstrumentToUser(id: string, createMyInstrumentDto: CreateMyInstrumentDto) {
    // const user: UserDocument = await this.userModel.findById(id);
    // user.myInstruments.push(createMyInstrumentDto);
    // return user.save();
    
    return this.userModel.findByIdAndUpdate(id, { $push: { myInstruments: createMyInstrumentDto } });
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).populate('myInstruments').exec();
  }
  

  async findAll() {
    return this.userModel.find().populate('myInstruments');
  }

  // // Get all musicians
  // async findAll(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }

  //   // Find a musician by id
  //   async findOne(id: string): Promise<Musician> {
  //     return this.musicianModel.findById(id).exec();
  //   }

  // Create a musician
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Delete a user by ID
  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }

  // async findOne(id: string): Promise<User | undefined> {
  //   return this.userModel.findById(id).exec();
  // }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email}).exec();
  }

  async deleteMany() {
    return this.userModel.deleteMany({}).exec();
  }
}
