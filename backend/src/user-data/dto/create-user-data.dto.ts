import { isNotEmpty } from "class-validator";

export class CreateUserDataDto {
  address: {
    street: string;
    number: string;
    city: string;
    zipcode: string;
  };

  phoneNumber: string;

  profileDescription: string;

  birthDate: Date;

  user: string;

}