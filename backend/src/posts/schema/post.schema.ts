import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types } from "mongoose";
import { Ensemble } from "src/ensemble/schema/ensemble.schema";
import { Instrument, InstrumentSchema } from "src/instruments/schema/instrument.schema";
import { User } from "src/user/schema/user.schema";

export class Post {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop(
        {type: InstrumentSchema}
    )
    @Type(() => Instrument)
    instrument: Instrument;
    @Prop({type: [{type: Types.ObjectId, ref: User.name}]})
    user: Types.ObjectId
    @Prop({type: [{type: Types.ObjectId, ref: Ensemble.name}]})
    ensemble: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post);
