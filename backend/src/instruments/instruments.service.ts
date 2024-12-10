import { Injectable } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Instrument } from './schema/instrument.schema';
import { Model } from 'mongoose';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {}
  create(createInstrumentDto: CreateInstrumentDto) {
    const createdInstrument = new this.instrumentModel(createInstrumentDto);
    return createdInstrument.save();
  }

  findAll() {
    return this.instrumentModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} instrument`;
  }

  update(id: number, updateInstrumentDto: UpdateInstrumentDto) {
    return `This action updates a #${id} instrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} instrument`;
  }
}
