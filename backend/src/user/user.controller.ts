import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateMyInstrumentsDto } from 'src/my-instruments/dto/create-my-instruments.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //Get all users
  @Get('')
  async findAll() {
    return this.usersService.findAll();
  }

  //Post a new user
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('/:id/my-instruments')
  createMyInstruments(
    @Param('id') id: string,
    @Body() createMyInstrumentsDto: CreateMyInstrumentsDto,
  ) {
    return this.usersService.linkMyInstrumentToUser(id, createMyInstrumentsDto);
  }
  //Get user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // Delete one user by id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
