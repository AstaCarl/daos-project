import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Patch,
  Put,
  Req,
  BadRequestException,
  Query,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchDTO } from './dto/search-musician.dto';
import { AddInstrumentDto } from './dto/add-instrument.dto';

//'user' This string specifies the base route path for all the routes defined in this controller. It means that any route in this controller will start with /user.
@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //Register a new user at the endpoint /user
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    //calls the createUser() method from the UsersService class
    return await this.usersService.createUser(createUserDto);
  }

  //Search for a musician by instrument, at the endpoint /user/search
  @Get('search')
  search(@Query() search: SearchDTO) {
    //calls the searchMusician() method from the UsersService class
    return this.usersService.searchMusician(search);
  }

  //Get all users that are musicians (have at least one instrument), at the endpoint /user
  @Get('')
  async find() {
    //calls the findMusicians() method from the UsersService class
    return this.usersService.findMusicians();
  }

  //Link an instrument to a user, creating a myInstruments array, at the endpoint /user/:id/my-instruments
  //Uses the AuthGuard to check if the user is authenticated with a valid token
  @UseGuards(AuthGuard)
  @Post('/:id/my-instruments')
  async createMyInstruments(
    //Extract the user id from the request parameters, and stores it in a new variable
    @Param('id') id: string,
    @Body() addInstrumentDto: AddInstrumentDto,
  ) {
    //calls the findOne() method from the UsersService class, and finds the user by id
    const user = await this.usersService.findOne(id);
    
    //Extract the instrument id from the request body, and stores it in a new variable
    const newInstrumentId = addInstrumentDto._id;

  // Checks if the instrument already exists in the user's instruments
    const isDuplicate = user.myInstruments.some(instrument => instrument._id.toString() === newInstrumentId);

    if (isDuplicate) {
      //If the instrument already exists, throw a ConflictException
      throw new ConflictException('Instrument already exists');
    }
    //If the instrument does not exist, call the linkMyInstrumentToUser() method from the UsersService class
    return this.usersService.linkMyInstrumentToUser(id, addInstrumentDto);
  }

  //Update a user's myInstruments (remove one instrument) at the endpoint /user/:id/my-instruments/:myInstrumentId
  @UseGuards(AuthGuard)
  @Delete('/:id/my-instruments/:myInstrumentId')
  removeMyInstrument(
    @Param('id') id: string,
    @Param('myInstrumentId') myInstrumentId: string,
  ) {
    //calls the removeMyInstrument() method from the UsersService class
    return this.usersService.removeMyInstrument(id, myInstrumentId);
  }

  //Get, find a user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    //calls the findOne() method from the UsersService class
    return this.usersService.findOne(id);
  }

  //Get, find a user by email at the endpoint /user/email/:email
  @Get('email/:email')
  findOneUser(@Param('email') email: string) {
    //calls the findByEmail() method from the UsersService class
    return this.usersService.findByEmail(email);
  }

  //Delete one user by id at the endpoint /user/:id
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    //calls the removeUser() method from the UsersService class
    return this.usersService.removeUser(id);
  }

  //Update one user by id, to change the password, at the endpoint /user/:id
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    //Extract the request from the request object
    @Req() req,
  ) {
    //find the user by id
    const user = await this.usersService.findOne(id);

    //Extract the current password and new password from the request body
    updateUserDto = req.body;

    //Check if the currentPassword matches the user's password
    if (updateUserDto.currentPassword === user.password) {
      //If the passwords match, update the user's password
      user.password = updateUserDto.newPassword;
      return this.usersService.updatePassword(user);
    } else {
      //If the passwords do not match, throw a BadRequestException
      throw new BadRequestException('Passwords do not match');
    }
  }
}
