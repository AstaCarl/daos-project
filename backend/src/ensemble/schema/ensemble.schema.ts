import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from 'src/user/schema/user.schema';

export type EnsembleDocument = Ensemble & Document;

@Schema()
export class Ensemble {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  website: string;

  @Prop()
  zipCode: string;

  @Prop()
  city: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  activeUsers: Types.ObjectId[];
  
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
