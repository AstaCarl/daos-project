import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}


  async create(createPostDto: CreatePostDto): Promise<Post> {
    console.log("Received DTO:", createPostDto);
    const createdPost = new this.postModel(createPostDto);
    console.log("created dto:", createdPost);
    return createdPost.save();
  }

  findAll() {
   return this.postModel.find().populate('instrument').populate('ensemble').populate('user').sort({ createdAt: -1 }).exec();
  }

  async findOneByUserId(id: string) {
    const objectId = new Types.ObjectId(id);
    const posts = await this.postModel.find({ user: objectId }).populate('instrument').populate('ensemble').populate('user').sort({ createdAt: -1 }).exec();
    if (posts.length === 0) {
      return [];
    }
    else {
      return posts;
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
