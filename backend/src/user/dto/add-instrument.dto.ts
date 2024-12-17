import { IsNotEmpty } from "class-validator";

export class AddInstrumentDto {
    @IsNotEmpty()
    _id: string;
}