import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level, LevelDocument } from './entities/level.entity';

@Injectable()
export class LevelsService {
constructor(@InjectModel(Level.name) private levelModel: Model<LevelDocument>) {}


  create(createLevelDto: CreateLevelDto) {
    const createLevel = new this.levelModel(createLevelDto);
    return createLevel.save();
  }


  findAll() {
    return `This action returns all levels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
