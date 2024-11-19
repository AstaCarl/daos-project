import { Module } from '@nestjs/common';
import { EnsembleService } from './ensemble.service';
import { EnsembleController } from './ensemble.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble, EnsembleSchema } from './schema/ensemble.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
  ],
  controllers: [EnsembleController],
  providers: [EnsembleService],
  exports: [MongooseModule],
})
export class EnsembleModule {}
