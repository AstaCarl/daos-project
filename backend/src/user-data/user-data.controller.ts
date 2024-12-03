import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from '../user/users.service';
import * as jwt from 'jsonwebtoken';

@Controller('user-data')
export class UserDataController {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDataDto: CreateUserDataDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token) as any;
    const email = decodedToken.email;
    const userResponse = await this.usersService.findByEmail(email);
    const userId = userResponse._id;
    return this.userDataService.create(createUserDataDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('')
  async findOne(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token) as any;
    const email = decodedToken.email;
    const userResponse = await this.usersService.findByEmail(email);
    const userId = userResponse._id;
    return this.userDataService.findOne(userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDataDto: UpdateUserDataDto,
    @Req() req,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token) as any;
    const email = decodedToken.email;
    const userResponse = await this.usersService.findByEmail(email);
    const userId = userResponse._id;
    return this.userDataService.update(id, updateUserDataDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDataService.remove(+id);
  }
}
