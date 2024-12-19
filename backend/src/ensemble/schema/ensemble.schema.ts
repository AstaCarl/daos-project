import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { User } from '../../user/schema/user.schema';

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
  zipcode: string;

  @Prop()
  city: string;

  // Define a reference to the User model
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  activeUsers: User[];

  @Prop()
  genre: string[];

  @Prop()
  rehearsalFrequency: string;

  @Prop()
  playType: string;
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
