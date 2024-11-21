import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import {
  Instrument,
  InstrumentSchema,
} from '../../instruments/schema/instrument.schema';
 
export type MyInstrumentsDocument = MyInstruments & Document;

@Schema()
export class MyInstruments {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: InstrumentSchema })
  @Type(() => Instrument)
  instrument: Instrument;
}

export const MyInstrumentsSchema = SchemaFactory.createForClass(MyInstruments);
