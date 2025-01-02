import { IsNotEmpty, IsEmail } from 'class-validator';

// DTO (data-transfer-object) is an object used to transfer data between client and server.
export class CreateUserDto {
  //Validation decorators to validate the data before sending it to the server
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
  }