import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  //Create a new instrument
  @Post()
  create(@Body() createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentsService.createInstrument(createInstrumentDto);
  }

  //Get all instruments
  @Get()
  findAll() {
    return this.instrumentsService.findAllInstruments();
  }
}
