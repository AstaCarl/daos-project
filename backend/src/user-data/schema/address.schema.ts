import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Address {
  @Prop()
  street: string;

  @Prop()
  number: string;

  @Prop()
  city: string;

  @Prop()
  zipcode: string;
}