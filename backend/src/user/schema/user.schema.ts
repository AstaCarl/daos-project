import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { MyInstruments } from 'src/my_instruments/entities/my_instrument.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MyInstruments.name })
  // @Type(() => MyInstruments)
  // myInstruments: MyInstruments;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }] })
  myInstruments: mongoose.Types.ObjectId[];

  //   @Prop({default : Date.now})
  //   createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
