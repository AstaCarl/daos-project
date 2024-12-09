import { Injectable } from '@nestjs/common';
import { CreateMyInstrumentsDto } from './dto/create-my-instruments.dto';
import { UpdateMyInstrumentsDto } from './dto/update-my-instruments.dto';

@Injectable()
export class MyInstrumentsService {
  create(createMyInstrumentsDto: CreateMyInstrumentsDto) {
    return 'This action adds a new myInstrument';
  }

  findAll() {
    return `This action returns all myInstruments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myInstrument`;
  }

  update(id: number, updateMyInstrumentsDto: UpdateMyInstrumentsDto) {
    return `This action updates a #${id} myInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} myInstrument`;
  }
}
