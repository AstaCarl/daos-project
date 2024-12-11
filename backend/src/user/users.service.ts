import { Model, Types } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMyInstrumentsDto } from 'src/my-instruments/dto/create-my-instruments.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchDTO } from './dto/search-musician.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(id: string): Promise<User | undefined> {
    return (await this.userModel.findById(id)).populate('myInstruments');
  }

  findMusicians() {
    return this.userModel
      .find({ myInstruments: {  $exists: true, $ne: [] }})
      .populate('myInstruments');
  }

  // Create a user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
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

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  removeMyInstrument(id: string, myInstrumentId: string) {
    return this.userModel
      .findByIdAndUpdate(id, { $pull: { myInstruments: myInstrumentId } })
      .exec();
  }

  async deleteMany() {
    return this.userModel.deleteMany({}).exec();
  }

  async linkMyInstrumentToUser(
    id: string,
    createMyInstrumentsDto: CreateMyInstrumentsDto,
  ) {
    return this.userModel
      .findByIdAndUpdate(id, {
        $push: { myInstruments: createMyInstrumentsDto },
      })
      .exec();
    }

  async update(user: any) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: user._id }, user)
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  searchMusician(search: SearchDTO): Promise<User[]> {
    const filter: any = {};

    if (search.instrumentId) {
      filter.myInstruments = new Types.ObjectId(search.instrumentId);
    }
    
    return this.userModel.find(filter).populate('myInstruments').exec();
  }


}

