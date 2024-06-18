import { TodosService } from './todos.service';
// import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodosQuery } from './queries/impl/get-todos.query';
import { CreateTodoCommand } from './commands/impl/create-todo.command';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('me')
  findMyTodos(@Query('query') date: string) {
    const userId = 1;
    return this.queryBus.execute(new GetTodosQuery(userId, date));
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
