import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../common/constants.js';

export interface JwtPayload {
  username: string;
}

@Injectable()
// 验证请求头中的token
export default class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:jwtConstants.secret
    })
  }
  async validate(payLoad:JwtPayload) {
    const {username} = payLoad
    return {
      username
    }
  }
}

