import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Prop} from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

//Defined the schema of the Instrument model
@Schema()
export class Instrument {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    name: string;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);