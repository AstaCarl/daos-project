import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  currentPassword: string;
  @IsNotEmpty()
  newPassword: string;
}
