import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MyInstrumentsService } from './my_instruments.service';
import { CreateMyInstrumentDto } from './dto/create-my_instrument.dto';
import { UpdateMyInstrumentDto } from './dto/update-my_instrument.dto';

@Controller('my-instruments')
export class MyInstrumentsController {
  constructor(private readonly myInstrumentsService: MyInstrumentsService) {}

  @Post()
  create(@Body() createMyInstrumentDto: CreateMyInstrumentDto) {
    return this.myInstrumentsService.create(createMyInstrumentDto);
  }

  @Get()
  findAll() {
    return this.myInstrumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myInstrumentsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMyInstrumentDto: UpdateMyInstrumentDto) {
  //   return this.myInstrumentsService.update(+id, updateMyInstrumentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myInstrumentsService.remove(+id);
  }
}
