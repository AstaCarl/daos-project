import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { now, ObjectId } from 'mongoose';
import { Instrument } from '../../instruments/schema/instrument.schema';

//Schema decorator to define the schema of the User model
@Schema()
export class User {
  //Transform decorator to convert the ObjectId to a string
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  //Prop decorator to define the properties of the User model
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  // default value is the current date
  @Prop({ default: now() })
  createdAt: Date;

  // define the relationship between the User and Instrument models, myInstruments is an array of Instrument objects.
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }] })
  myInstruments: Instrument[];
  
}

//Export the User schema
export const UserSchema = SchemaFactory.createForClass(User);
