import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {

    constructor(private usersService: UsersService) {}

    // @Get('')
    // getMusicians(): string {
    //     return "We are the users!";
    // }

    //Get all musicians
    @Get('')
    findAll(){
      return this.usersService.findAll();
    }

    //Post a new user
    @Post('')
    async create(@Body() createUserDto: CreateUserDto) {
      return await this.usersService.create(createUserDto);
    }

}


