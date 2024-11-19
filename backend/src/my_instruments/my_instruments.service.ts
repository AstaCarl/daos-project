import { Injectable } from '@nestjs/common';
import { CreateMyInstrumentDto } from './dto/create-my_instrument.dto';
import { UpdateMyInstrumentDto } from './dto/update-my_instrument.dto';

@Injectable()
export class MyInstrumentsService {
  create(createMyInstrumentDto: CreateMyInstrumentDto) {
    return 'This action adds a new myInstrument';
  }

  findAll() {
    return `This action returns all myInstruments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myInstrument`;
  }

  update(id: number, updateMyInstrumentDto: UpdateMyInstrumentDto) {
    return `This action updates a #${id} myInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} myInstrument`;
  }
}
