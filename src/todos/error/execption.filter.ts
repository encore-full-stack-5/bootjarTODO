import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFriendError } from './not-friend.error';
import { UserNotFoundError } from './user-not-found.error';
import { PublicScopeError } from "./public-scope.error";
import { TodoPermissonError } from "./todo-permisson.error";

@Catch(NotFriendError)
export class NotFriendExceptionFilter implements ExceptionFilter {
  catch(exception: NotFriendError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
@Catch(UserNotFoundError)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFriendError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
@Catch(PublicScopeError)
export class PublicScopeExceptionFilter implements ExceptionFilter {
  catch(exception: PublicScopeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
@Catch(TodoPermissonError)
export class TodoPermissonExceptionFilter implements ExceptionFilter {
  catch(exception: TodoPermissonError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
