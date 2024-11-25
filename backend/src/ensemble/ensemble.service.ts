import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Ensemble } from './schema/ensemble.schema';

@Injectable()
export class EnsembleService {
  constructor(
    @InjectModel('Ensemble') private ensembleModel: Model<Ensemble>,
  ) {}
  create(createEnsembleDto: CreateEnsembleDto, userId: any) {
    const createdEnsemble = new this.ensembleModel(createEnsembleDto);
    createdEnsemble.activeUsers = userId;
    return createdEnsemble.save();
  }

  findAll() {
    return this.ensembleModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    const ensembles = await this.ensembleModel.find({ activeUsers: objectId }).exec();
    if (ensembles.length > 0) {
      return ensembles;
    } else {
      return `No ensemble found with user ID #${id}`;
    }
  }

  async update(
    id: string,
    updateEnsembleDto: UpdateEnsembleDto,
    userId: any,
  ): Promise<Ensemble> {
    const ensemble = await this.ensembleModel.findById(id).exec()
    if (!ensemble) {
      throw new Error('Ensemble not found');
    }
    Object.assign(ensemble, updateEnsembleDto);

    if (ensemble.activeUsers.includes(userId)) {
      throw new HttpException('User already registered in this ensemble', HttpStatus.BAD_REQUEST);
    } else {
      ensemble.activeUsers.push(userId);
    } 
    return ensemble.save();
  }

  remove(id: number) {
    return `This action removes a #${id} ensemble`;
  }
}
