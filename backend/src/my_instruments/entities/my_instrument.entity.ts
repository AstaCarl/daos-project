
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { Transform, Type } from 'class-transformer';
import { Instrument, InstrumentSchema } from '../../instruments/entities/instrument.entity';
import { Level, LevelSchema } from 'src/levels/entities/level.entity';
 
export type MyInstrumentsDocument = MyInstruments & Document;
 
@Schema()
export class MyInstruments {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: InstrumentSchema })
  @Type(() => Instrument)
  instrument: Instrument;

  @Prop({ type: LevelSchema })
  @Type(() => Level)
  level: Level;
}
 
export const MyInstrumentsSchema = SchemaFactory.createForClass(MyInstruments);
