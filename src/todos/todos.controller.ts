import { TodosService } from './todos.service';
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
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodosQuery } from './queries/impl/get-todos.query';
import { CreateTodoCommand } from './commands/impl/create-todo.command';
import { Response } from 'express';
import { GetTodosDto } from './dto/get-todos.dto';
import { GetTodoQuery } from './queries/impl/get-todo.query';
import { GetTodoDto } from './dto/get-todo.dto';
import { UpdateTodoCommand } from './commands/impl/update-todo.command';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteTodoCommand } from './commands/impl/delete-todo.command';

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
    @Param('todoId') todoId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const todo: GetTodoDto = await this.queryBus.execute(
      new GetTodoQuery(todoId),
    );
    res.status(HttpStatus.OK);
    return todo;
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
