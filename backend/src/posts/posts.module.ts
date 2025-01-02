import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentsModule } from '../instruments/instruments.module';
import { Post, PostSchema } from './schema/post.schema';
import { UserModule } from '../user/user.module';
import { EnsembleModule } from '../ensemble/ensemble.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    InstrumentsModule,
    UserModule,
    EnsembleModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
