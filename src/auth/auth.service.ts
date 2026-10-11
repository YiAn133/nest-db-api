import { HttpException, Injectable ,BadRequestException} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity.js';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs'


@Injectable()
export class AuthService {
 
  constructor(
    @InjectRepository(Auth) private readonly AuthRepo: Repository<Auth>,
    private readonly JwtService: JwtService) { }
//  注册用户
  async signup(AuthData: CreateAuthDto) {
    const findUserName = AuthData.name
    const findUser = await this.AuthRepo.findOne({where:{name:findUserName}})
    if(findUser){
      return "用户已经存在"
    }
    AuthData.password = bcryptjs.hashSync(AuthData.password,10)

    const user = this.AuthRepo.create(AuthData)
    const res = await this.AuthRepo.save(user)
    
    return {msg:"注册成功",data:res}
  }


  // 登录
  async login(AuthData:CreateAuthDto){
    const findUser = await this.AuthRepo.findOne({
      where:{name:AuthData.name}
    })
    if(!findUser){
      return new BadRequestException(`查询的姓名:${AuthData.name}不存在`)
    }
    const compareRes:boolean = bcryptjs.compareSync(
      AuthData.password,
      findUser.password
    )
    if(!compareRes){
      return new BadRequestException("密码错误")
    }
     const payload = { username: findUser.name };

     
    return {msg:"登录成功",token:this.JwtService.sign(payload)}
  }
}
