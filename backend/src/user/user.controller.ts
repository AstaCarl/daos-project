import { CreateMyInstrumentsDto } from '../my-instruments/dto/create-my-instruments.dto';
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

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //Register a new user
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('search')
  search(@Query() search: SearchDTO) {
    return this.usersService.searchMusician(search);
  }

  //Get all users that are musicians (have at least one instrument)
  @Get('')
  async find() {
    return this.usersService.findMusicians();
  }

  //Link an instrument to a user, creating a myInstruments array
  @UseGuards(AuthGuard)
  @Post('/:id/my-instruments')
  async createMyInstruments(
    @Param('id') id: string,
    @Body() createMyInstrumentsDto: CreateMyInstrumentsDto,
  ) {
    const user = await this.usersService.findOne(id);
    const newInstrumentId = createMyInstrumentsDto._id;
    const isDuplicate = user.myInstruments.some(instrument => instrument._id.toString() === newInstrumentId);
    if (isDuplicate) {
      throw new ConflictException('Instrument already exists');
    }
    return this.usersService.linkMyInstrumentToUser(id, createMyInstrumentsDto);
  }

  //Update a user's myInstruments (remove one instrument)
  @UseGuards(AuthGuard)
  @Patch('/:id/my-instruments/:myInstrumentId')
  removeMyInstrument(
    @Param('id') id: string,
    @Param('myInstrumentId') myInstrumentId: string,
  ) {
    return this.usersService.removeMyInstrument(id, myInstrumentId);
  }

  //Get, find a user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  //Get, find a user by email
  @Get('email/:email')
  findOneUser(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  //Delete one user by id
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  //Update one user by id, to change the password
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const user = await this.usersService.findOne(id);
    updateUserDto = req.body;
    if (updateUserDto.currentPassword === user.password) {
      user.password = updateUserDto.newPassword;
      return this.usersService.updatePassword(user);
    } else {
      throw new BadRequestException('Passwords do not match');
    }
  }
}
