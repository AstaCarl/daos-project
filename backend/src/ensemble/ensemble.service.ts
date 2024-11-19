import { Injectable } from '@nestjs/common';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ensemble } from './schema/ensemble.schema';

@Injectable()
export class EnsembleService {
  constructor(
    @InjectModel('Ensemble') private ensembleModel: Model<Ensemble>,
  ) {}
  create(createEnsembleDto: CreateEnsembleDto) {
    const createdEnsemble = new this.ensembleModel(createEnsembleDto);
    return createdEnsemble.save();
  }

  findAll() {
    return `This action returns all ensemble`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ensemble`;
  }

  update(id: number, updateEnsembleDto: UpdateEnsembleDto) {
    return `This action updates a #${id} ensemble`;
  }

  remove(id: number) {
    return `This action removes a #${id} ensemble`;
  }
}
