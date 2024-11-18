import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from './entities/level.entity';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [MongooseModule],
})
export class LevelsModule {}
