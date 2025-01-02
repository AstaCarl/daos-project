import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Ensemble } from '../../ensemble/schema/ensemble.schema';
import { Instrument } from '../../instruments/schema/instrument.schema';
import { User } from '../../user/schema/user.schema';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  // Define a reference to the Instrument model
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' })
  instrument: Instrument;

  // Define a reference to the Ensemble model
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ensemble' })
  ensemble: Ensemble;

  // Define a reference to the User model
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
