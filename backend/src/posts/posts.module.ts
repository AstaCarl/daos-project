import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentsModule } from 'src/instruments/instruments.module';
import { Post, PostSchema } from './schema/post.schema';
import { UserModule } from 'src/user/user.module';
import { EnsembleModule } from 'src/ensemble/ensemble.module';

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
