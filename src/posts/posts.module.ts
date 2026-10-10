import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';
import { Post } from './entities/post.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // TypeOrmModule.forFeature([Post])把 `Post` 
  // 这个实体类注册进当前 Nest 模块，让本模块内可以**注入 Repository**，从而操作 `posts` 表。
  imports:[TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
