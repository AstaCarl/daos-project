import { PartialType } from '@nestjs/mapped-types';
import { CreateMyInstrumentsDto } from './create-my-instruments.dto';

export class UpdateMyInstrumentsDto extends PartialType(CreateMyInstrumentsDto) {}
