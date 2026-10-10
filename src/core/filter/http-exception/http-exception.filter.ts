import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import type { Response} from 'express'

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse:any = exception.getResponse();
    let vaidMessage = ''
    if(typeof exceptionResponse === 'object'){//返回的是对象，但是里面的message可能是数组也可能是字符串
      vaidMessage = typeof exceptionResponse.message === 'string' ? exceptionResponse.message : exceptionResponse.message[0]
    }
    // 判断你当前的错误信息是对象还是字符串，如果是字符串那么就直接赋值给message 如果是对象那么就
    const message = exception.message ? exception.message : `${status >= 500 ? 'Service Error' : 'Client Error'}`

    const errorResponse = {
      data:{},
      message:vaidMessage || message,
      code:-1
    }

    response.status(status);
    response.header('Content-Type', 'application/json;charset=utf-8')
    response.send(errorResponse)
  }
}
