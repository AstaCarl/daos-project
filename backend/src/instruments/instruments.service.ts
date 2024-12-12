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

  //Create a new instrument
  createInstrument(createInstrumentDto: CreateInstrumentDto) {
    const createdInstrument = new this.instrumentModel(createInstrumentDto);
    return createdInstrument.save();
  }

  //Get all instruments
  findAllInstruments() {
    return this.instrumentModel.find();
  }
}
