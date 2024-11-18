
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';
 
export type InstrumentDocument = Instrument & Document;
 
@Schema()
export class Instrument {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

    @Prop()
    name: string;
}
 
export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
