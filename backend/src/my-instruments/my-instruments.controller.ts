import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyInstrumentsService } from './my-instruments.service';
import { CreateMyInstrumentsDto } from './dto/create-my-instruments.dto';
import { UpdateMyInstrumentsDto } from './dto/update-my-instruments.dto';

@Controller('my-instruments')
export class MyInstrumentsController {
  constructor(private readonly myInstrumentsService: MyInstrumentsService) {}

  @Post()
  create(@Body() createMyInstrumentsDto: CreateMyInstrumentsDto) {
    return this.myInstrumentsService.create(createMyInstrumentsDto);
  }

  @Get()
  findAll() {
    return this.myInstrumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myInstrumentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMyInstrumentsDto: UpdateMyInstrumentsDto,
  ) {
    return this.myInstrumentsService.update(+id, updateMyInstrumentsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myInstrumentsService.remove(+id);
  }
}
