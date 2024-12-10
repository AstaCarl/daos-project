import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { ObjectId } from "mongoose";
import { Instrument, InstrumentSchema } from "src/instruments/schema/instrument.schema";

@Schema()
export class MyInstruments {
    @Transform (({ value }) => value.toString())
    _id: ObjectId;

    @Prop({type: InstrumentSchema})
    @Type(() => Instrument)
    instrument: Instrument;
}

export const MyInstrumentsSchema = SchemaFactory.createForClass(MyInstruments);