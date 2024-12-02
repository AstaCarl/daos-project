import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateEnsembleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  website: string;

  @IsNotEmpty()
  zipcode: string;

  @IsNotEmpty()
  city: string;

  activeUsers: string[];

  @ArrayNotEmpty()
  genre: string[];

  @IsNotEmpty()
  rehearsalFrequency: string;

  @IsNotEmpty()
  playType: string;
}
