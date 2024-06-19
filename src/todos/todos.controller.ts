import { TodosService } from './todos.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodosQuery } from './queries/impl/get-todos.query';
import { CreateTodoCommand } from './commands/impl/create-todo.command';
import { Response } from 'express';
import { Todo } from './entities/todos.entity';
import { GetTodosDto } from "./dto/get-todos.dto";

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('me')
  async findMyTodos(
    @Query('query') date: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = 1;
    const todos: GetTodosDto[] = await this.queryBus.execute(
      new GetTodosQuery(userId, date),
    );
    res.status(HttpStatus.OK);
    return { todos };
  }
  @Get('/friends/:friendId')
  async findFriendTodos(
    @Param('friendId') friendId: number,
    @Query('query') date: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const todos: GetTodosDto[] = await this.queryBus.execute(
      new GetTodosQuery(friendId, date),
    );
    res.status(HttpStatus.OK); // body를 리턴으로 안주고 .json()으로 던져주면 여러번 응답 요청이 왔을때 에러남
    return { todos };
  }
  @Get('/:todoId')
  async findTodo(
    @Param('friendId') friendId: number,
    @Query('query') date: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const todos: Todo[] = await this.queryBus.execute(
      new GetTodosQuery(friendId, date),
    );
    res.status(HttpStatus.OK);
    return { todos };
  }
  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = 1;
    await this.commandBus.execute(new CreateTodoCommand(userId, createTodoDto));
    res.status(HttpStatus.CREATED);
    return { message: 'TO-DO 등록 성공' };
  }
}
