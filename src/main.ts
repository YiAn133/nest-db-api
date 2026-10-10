import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter.js';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor.js';
import { ValidationPipe } from '@nestjs/common';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });



   // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);



   app.useGlobalFilters(new HttpExceptionFilter())
   app.useGlobalInterceptors(new TransformInterceptor())
   app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
 
}
await bootstrap();
