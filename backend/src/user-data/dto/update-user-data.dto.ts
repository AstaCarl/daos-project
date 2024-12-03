import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDataDto } from './create-user-data.dto';

export class UpdateUserDataDto extends PartialType(CreateUserDataDto) {
    address: {
        street: string;
        number: string;
        city: string;
        zipcode: string;
      };
    
      phoneNumber: string;
    
      profileDescription: string;
    
      birthDate: Date;
}
