import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import{TypeOrmModule} from '@nestjs/typeorm'
import { Auth } from './entities/auth.entity.js';
import{ JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../common/constants.js';

@Module({
  imports:[TypeOrmModule.forFeature([Auth]),
  JwtModule.register({secret:jwtConstants.secret,
    signOptions:{expiresIn:jwtConstants.expiresIn}})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
