import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMyTodosQuery } from './queries/impl/get-my-todos.query';
import { CreateTodoCommand } from './commands/impl/create-todo.command';
import { Response } from 'express';
import { GetTodosDto } from './dto/get-todos.dto';
import { GetTodoQuery } from './queries/impl/get-todo.query';
import { GetTodoDto } from './dto/get-todo.dto';
import { UpdateTodoCommand } from './commands/impl/update-todo.command';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteTodoCommand } from './commands/impl/delete-todo.command';
import { AuthGuard } from './auth/auth.guard';
import { GetFriendTodosQuery } from './queries/impl/get-friend-todos.query';
import { NotFriendExceptionFilter, UserNotFoundExceptionFilter } from "./error/execption.filter";
import { GetUserTodosQuery } from "./queries/impl/get-user-todos.query";

@Controller('todos')
export class TodosController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async findMyTodos(
    @Query('query') date: string,
    @Res({ passthrough: true }) res: Response,
    @Request() req,
  ) {
    const todos: GetTodosDto[] = await this.queryBus.execute(
      new GetMyTodosQuery(req.user.id, date),
    );
    res.status(HttpStatus.OK);
    return { todos };
  }
  @UseFilters(new NotFriendExceptionFilter(), new UserNotFoundExceptionFilter)
  @UseGuards(AuthGuard)
  @Get('/friends/:friendId')
  async findFriendTodos(
    @Param('friendId') friendId: number,
    @Query('query') date: string,
    @Res({ passthrough: true }) res: Response,
    @Request() req,
  ) {
    const todos: GetTodosDto[] = await this.queryBus.execute(
      new GetFriendTodosQuery(req.user.id, friendId, date),
    );
    res.status(HttpStatus.OK); // body를 리턴으로 안주고 .json()으로 던져주면 여러번 응답 요청이 왔을때 에러남
    return { todos };
  }
  @UseFilters(new NotFriendExceptionFilter(), new UserNotFoundExceptionFilter())
  @UseGuards(AuthGuard)
  @Get('/users/:userId')
  async findUserTodos(
    @Param('userId') userId: number,
    @Query('query') date: string,
    @Res({ passthrough: true }) res: Response,
    @Request() req,
  ) {
    const todos: GetTodosDto[] = await this.queryBus.execute(
      new GetUserTodosQuery(req.user.id, userId, date),
    );
    res.status(HttpStatus.OK); // body를 리턴으로 안주고 .json()으로 던져주면 여러번 응답 요청이 왔을때 에러남
    return { todos };
  }
  @UseGuards(AuthGuard)
  @Get('/:todoId')
  async findTodo(
    @Param('todoId') todoId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const todo: GetTodoDto = await this.queryBus.execute(
      new GetTodoQuery(todoId),
    );
    res.status(HttpStatus.OK);
    return todo;
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Res({ passthrough: true }) res: Response,
    @Request() req,
  ) {
    await this.commandBus.execute(
      new CreateTodoCommand(req.user.id, createTodoDto),
    );
    res.status(HttpStatus.CREATED);
    return { message: 'TO-DO 등록 성공' };
  }
  @UseGuards(AuthGuard)
  @Put('/:todoId')
  async update(
    @Param('todoId') todoId: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.commandBus.execute(new UpdateTodoCommand(todoId, updateTodoDto));
    res.status(HttpStatus.OK);
    return { message: 'TO-DO 수정 성공' };
  }
  @UseGuards(AuthGuard)
  @Delete('/:todoId')
  async delete(
    @Param('todoId') todoId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.commandBus.execute(new DeleteTodoCommand(todoId));
    res.status(HttpStatus.OK);
    return { message: 'TO-DO 삭제 성공' };
  }
}
