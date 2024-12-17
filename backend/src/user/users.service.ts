import { Model, Types } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMyInstrumentsDto } from '../my-instruments/dto/create-my-instruments.dto';
import { SearchDTO } from './dto/search-musician.dto';

@Injectable()
export class UsersService {
  // Inject the User model into the service
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Register a user method
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //Check if the user already exists, by finding the user with the same email
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (existingUser) {
      //If the user already exists, throw a ConflictException
      throw new ConflictException('User with this email already exists');
    }
    //Create a new user with the CreateUserDto data
    const createdUser = new this.userModel(createUserDto);
    //Save the user in the database, and return the result
    return createdUser.save();
  }

  //Search for a musician by instrument
  searchMusician(searchDTO: SearchDTO): Promise<User[]> {
    // Creates an empty filter object
    const filter: any = {};

    // Check if the search object has an instrumentId property
    if (searchDTO.instrumentId) {
      //if it does it adds the instrumentId to the filter object
      filter.myInstruments = new Types.ObjectId(searchDTO.instrumentId);
    } else {
      //if it does not, it adds a filter to search for users that have at least one instrument
      filter.myInstruments = { $exists: true, $ne: [] };
    }
    // Returns the users that matches the filter, and populates the myInstruments field
    return this.userModel.find(filter).populate('myInstruments').exec();
  }

  //************************ Might not need this ********************//
  //Get all users that are musicians
  findMusicians() {
    return (
      this.userModel
        //Search for users that have at least one instrument
        .find({ myInstruments: { $exists: true, $ne: [] } })
        .populate('myInstruments')
    );
  }

  //Link an instrument to a user, creating a myInstruments array
  async linkMyInstrumentToUser(
    id: string,
    createMyInstrumentsDto: CreateMyInstrumentsDto,
  ) {
    return (
      this.userModel
        //Find the user by ID, and push the new instrument to the myInstruments array
        .findByIdAndUpdate(
          id,
          // $push adds a new element to an array
          { $push: { myInstruments: createMyInstrumentsDto } },
          { new: true }, // This option returns the updated document
        )
        .populate('myInstruments')
        .exec()
    );
  }

  //Update a user's myInstruments (remove one instrument)
  removeMyInstrument(id: string, myInstrumentId: string) {
    return (
      this.userModel
        //Find the user by ID, and pull the instrument from the myInstruments array
        // $pull removes all instances of a value from an existing array
        .findByIdAndUpdate(id, { $pull: { myInstruments: myInstrumentId } })
        .exec()
    );
  }

  //Get a user
  async findOne(id: string): Promise<User | undefined> {
    //Find the user by ID, and populate the myInstruments field
    return (await this.userModel.findById(id)).populate('myInstruments');
  }

  //Get a user by email
  async findByEmail(email: string): Promise<User | undefined> {
    //Find the user by email
    return this.userModel.findOne({ email }).exec();
  }

  // Delete a user by ID
  async removeUser(id: string): Promise<User> {
    //Find the user by ID, and delete it
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      //If the user does not exist, throw a NotFoundException
      throw new NotFoundException('User not found');
    }
    //Return the deleted user
    return deletedUser;
  }

  // Update a user by ID, to change the password
  async updatePassword(user: any) {
    const updatedUser = await this.userModel
      // Find the user by their ID and update their information
      .findOneAndUpdate({ _id: user._id }, user)
      .exec();
    if (!updatedUser) {
      //If the user does not exist, throw a NotFoundException
      throw new NotFoundException('User not found');
    }
    //Return the updated user
    return updatedUser;
  }

  //Delete all users, (this is a helper method for testing)
  async deleteMany() {

    return this.userModel.deleteMany({}).exec();
  }
}
