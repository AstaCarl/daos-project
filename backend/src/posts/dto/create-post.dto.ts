import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

//DTO to create a post, with validation decorators
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
