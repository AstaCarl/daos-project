import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
    currentPassword: string;
    newPassword: string;
  }