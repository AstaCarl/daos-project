import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';

export type LevelDocument = Level & Document;

@Schema()
export class Level {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
