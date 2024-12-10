import { CreateMyInstrumentsDto } from 'src/my-instruments/dto/create-my-instruments.dto';
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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //Get all users
  @Get('')
  async findMusicians() {
    return this.usersService.findMusicians();
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
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Update one user by id
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
      return this.usersService.update(user);
    } else {
      throw new BadRequestException('Passwords do not match');
    }
  }
}
