import { HttpException, Injectable, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { Post } from './entities/post.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostRo{
  list:Post[],
  count:number,
  totalPages:number,
  currentPage:number;
}


@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post)private readonly postsRepository:Repository<Post>
  ){}


  // 添加文章
 async create(post:Partial<Post>) :Promise<Post>{
    const {title} = post;
    if(!title){
      throw new HttpException('缺少文章标题',401);
    }
    const doc = await this.postsRepository.findOne({where:{title}})
    if(doc){
      throw new HttpException('文章已经存在',401)
    }
    return await this.postsRepository.save(post)
  }

  // 获取文章列表 ?????????????
  async findAll(page:number = 1 , pageSize:number = 10) :Promise<PostRo>{
    const [posts , totalCount] = await this.postsRepository.findAndCount({
      skip:(page - 1) * pageSize,
      take:pageSize,
      order:{create_time:'DESC'}
    })
    return {
      list:posts,
      count:totalCount,
      totalPages:Math.ceil(totalCount/pageSize),
      currentPage:page
    }
  }

  // 根据文章id 来查找文章
  async findById(id: number) :Promise<Post|null>{
    return await this.postsRepository.findOne({where:{id}})
  }

  // 根据id 来更新文章
  async updateById(id: number, newPost: Post):Promise<Post> {
    const post = await this.postsRepository.findOne({where:{id}})
    if(!post){
      throw new HttpException(`id为${id}的文章不存在`,401)
    }
    const updatePost =  this.postsRepository.merge(post , newPost)
    return this.postsRepository.save(updatePost)

  }

  // 删除文章
 async remove(id: number):Promise<Post> {
    const post = await this.postsRepository.findOne({where:{id}})
    if(!post){
      throw new HttpException(`要删除的文章id${id}不存在`,401)
    }
    return await this.postsRepository.remove(post)
  }
}
