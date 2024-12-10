import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument, now, ObjectId } from 'mongoose';
import { Instrument } from 'src/instruments/schema/instrument.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }] })
  myInstruments: Instrument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
