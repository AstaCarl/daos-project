import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //Get all users
  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  //Post a new user
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
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
