import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateMyInstrumentDto } from 'src/my_instruments/dto/create-my_instrument.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //Get all users
  @Get('')
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('/:id/my-instruments')
  createMyInstrument(@Param('id') id: string, @Body() createMyInstrumentDto: CreateMyInstrumentDto) {
    return this.usersService.linkMyInstrumentToUser(id, createMyInstrumentDto);
  }
  

  //Post a new user
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
        throw new BadRequestException('User with this email already exists');
    }
    return await this.usersService.create(createUserDto);
  }

  //Get user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Delete one user by id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
