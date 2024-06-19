import { TodosService } from './todos.service';
// import { CreateTodoDto, UpdateTodoDto } from './dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
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

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('me')
  async findMyTodos(@Query('query') date: string, @Res() res: Response) {
    const userId = 1;
    const todos: Todo[] = await this.queryBus.execute(
      new GetTodosQuery(userId, date),
    );
    res.status(HttpStatus.OK).json({ todos: todos }).send();
    // return this.todosService.findAll(userId, date);
  }
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    const userId = 1;
    return this.commandBus.execute(
      new CreateTodoCommand(userId, createTodoDto),
    );
    // return this.todosService.create(userId, createTodoDto);
  }
}
