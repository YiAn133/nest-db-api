import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module.js';
import{ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module.js';
import JwtAuthStrategy from './jwt-auth/jwt-auth.strategy.js'
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();


@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'db',
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
        host: 'localhost', // 主机，默认为localhost
        port: 3306, // 端口号
        username: 'root', // 用户名
        password:'123456', // 密码
        database: 'db', //数据库名
       autoLoadEntities:true,
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭

    }),
    PostsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,JwtAuthStrategy,{
    provide:APP_GUARD,
    useClass:JwtAuthGuard
  }],
})
export class AppModule {}
