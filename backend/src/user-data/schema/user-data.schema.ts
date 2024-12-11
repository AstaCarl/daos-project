import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId, Types } from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { Address } from './address.schema';


@Schema()
export class UserData {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: Address })
  address: Address;

  @Prop()
  phoneNumber: string;

  @Prop()
  profileDescription: string;

  @Prop()
  birthDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  user: Types.ObjectId[];
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
