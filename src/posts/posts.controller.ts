import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostRo, PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { Post as Posts} from './entities/post.entity.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

@ApiOperation({ summary: '创建文章' })
  @Post('/create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
@ApiOperation({ summary: '查看全部文章' })
  @Get('/findAll')
  async findAll(@Query() query:any ):Promise<PostRo> {
    return await this.postsService.findAll();
  }
@ApiOperation({ summary: '根据ID查找文章' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findById(+id);
  }
@ApiOperation({ summary: '根据ID更新文章内容' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() post: Posts) {
    return await this.postsService.updateById(+id, post);
  }
@ApiOperation({ summary: '根据ID删除文章' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
