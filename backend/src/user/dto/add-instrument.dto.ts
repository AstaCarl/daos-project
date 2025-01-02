import { IsNotEmpty } from "class-validator";

// DTO to add an instrument to the user.
export class AddInstrumentDto {
    @IsNotEmpty()
    _id: string;
}