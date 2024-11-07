// import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
    // @IsNotEmpty()
    name: string;

    lastname: string;

    // @IsNotEmpty()
    email: string;
    
    password: string;

    // createdAt: Date;

    // lastLogin: Date;
  }