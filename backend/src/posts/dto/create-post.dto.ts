import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    instrument: Types.ObjectId;
    @IsNotEmpty()
    user: string;
    @IsNotEmpty()
    ensemble: string;
}
