import { IsNotEmpty } from "class-validator";

export class CreateMyInstrumentsDto {
    @IsNotEmpty()
    _id: string;
    // instrument: string;
}
