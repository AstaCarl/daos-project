import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

// Method to create a new post
  createPost(createPostDto: CreatePostDto) {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  // Method to get all posts, and populate the instrument, ensemble, and user fields, and sort by createdAt newest first
  findAll() {
   return this.postModel.find().populate('instrument').populate('ensemble').populate('user').sort({ createdAt: -1 }).exec();
  }

  // Method to find a post by user id, and populate the instrument, ensemble, and user fields, and sort by createdAt newest first.
  async findOneByUserId(id: string) {

    // Create a new ObjectId from the id string
    const objectId = new Types.ObjectId(id);

    // Find all posts that have a user field that matches the objectId
    const posts = await this.postModel.find({ user: objectId }).populate('instrument').populate('ensemble').populate('user').sort({ createdAt: -1 }).exec();

    // return an empty array if no posts are found
    if (posts.length === 0) {
      return [];
    }
    else {
      return posts;
    }
  }
}
