import { IsNotEmpty } from 'class-validator';

// DTO to update the password of the user.
export class UpdateUserDto {
  @IsNotEmpty()
  currentPassword: string;
  @IsNotEmpty()
  newPassword: string;
}
