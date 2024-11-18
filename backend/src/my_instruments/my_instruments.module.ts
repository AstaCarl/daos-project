import { Module } from '@nestjs/common';
import { MyInstrumentsService } from './my_instruments.service';
import { MyInstrumentsController } from './my_instruments.controller';

@Module({
  controllers: [MyInstrumentsController],
  providers: [MyInstrumentsService],
})
export class MyInstrumentsModule {}
