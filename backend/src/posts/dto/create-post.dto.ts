import { Transform } from "class-transformer";
import { Types } from "mongoose";

export class CreatePostDto {
    title: string;
    description: string;
    instrument: Types.ObjectId;

    user: string;
    ensemble: string;
}
