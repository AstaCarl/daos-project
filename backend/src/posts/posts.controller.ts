import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

// Controler decorator, base route for posts
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Create a new post
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(createPostDto);
  }

  // Get all posts
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // Get a post by user id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOneByUserId(id);
  }

  //*********** Not made yet ***********//

  // update a post

  // delete a post
}
