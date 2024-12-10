import { Module } from '@nestjs/common';
import { MyInstrumentsService } from './my-instruments.service';
import { MyInstrumentsController } from './my-instruments.controller';

@Module({
  controllers: [MyInstrumentsController],
  providers: [MyInstrumentsService],
})
export class MyInstrumentsModule {}
