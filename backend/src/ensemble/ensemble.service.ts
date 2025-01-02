import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ensemble } from './schema/ensemble.schema';

@Injectable()
export class EnsembleService {
  constructor(
    @InjectModel('Ensemble') private ensembleModel: Model<Ensemble>,
  ) {}

  // Create ensemble
  createEnsemble(createEnsembleDto: CreateEnsembleDto, userId: any) {
    const createdEnsemble = new this.ensembleModel(createEnsembleDto);
    // Add userId as activeUsers
    createdEnsemble.activeUsers = userId;
    return createdEnsemble.save();
  }

  // Get all ensembles
  findAll() {
    return this.ensembleModel.find().exec();
  }

  // Get ensemble by user id, find all ensembles where activeUsers contains the user id
  async findEnsembleByUserId(id: string) {
    // Convert id to ObjectId
    const objectId = new Types.ObjectId(id);
    // Find all ensembles where activeUsers contains the user id
    const ensembles = await this.ensembleModel
      .find({ activeUsers: objectId })
      .exec();
      // Return ensembles if found, otherwise return empty array
    if (ensembles.length > 0) {
      return ensembles;
    } else {
      return [];
    }
  }

  // Update ensemble by id and add user as activeUsers
  async updateEnsemble(
    id: string,
    updateEnsembleDto: UpdateEnsembleDto,
    userId: any,
  ): Promise<Ensemble> {
    // find ensemble by id
    const ensemble = await this.ensembleModel.findById(id).exec();
    // if ensemble not found, throw error
    if (!ensemble) {
      throw new Error('Ensemble not found');
    }
    // udpate the found ensemble with the new data from updateEnsembleDto
    Object.assign(ensemble, updateEnsembleDto);

    // if activeUsers already contains the user id, throw error
    if (ensemble.activeUsers.includes(userId)) {
      throw new HttpException(
        'User already registered in this ensemble',
        HttpStatus.BAD_REQUEST,
      );
      // otherwise add the user id to activeUsers
    } else {
      ensemble.activeUsers.push(userId);
    }
    // save the updated ensemble
    return ensemble.save();
  }

  // Remove all ensembles
  async deleteMany() {
    return this.ensembleModel.deleteMany({}).exec();
  }
}
