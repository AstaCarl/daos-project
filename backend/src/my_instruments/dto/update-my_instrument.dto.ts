import { PartialType } from '@nestjs/mapped-types';
import { CreateMyInstrumentDto } from './create-my_instrument.dto';

export class UpdateMyInstrumentDto extends PartialType(CreateMyInstrumentDto) {}
