import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from './entities/instrument.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Instrument.name, schema: InstrumentSchema }]),
  ],
  exports: [MongooseModule],
})
export class InstrumentsModule {}
