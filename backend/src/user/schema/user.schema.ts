import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type, Transform } from 'class-transformer';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { MyInstruments } from 'src/my_instruments/entities/my_instrument.entity';

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

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MyInstruments.name })
  // @Type(() => MyInstruments)
  // myInstruments: MyInstruments;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }] })
  myInstruments: mongoose.Types.ObjectId[];

  //   @Prop({default : Date.now})
  //   createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
