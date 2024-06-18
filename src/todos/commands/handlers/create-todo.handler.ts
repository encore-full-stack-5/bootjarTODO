import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { CreateTodoCommand } from '../impl/create-todo.command';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async execute(command: CreateTodoCommand): Promise<Todo> {
    const { userId, createTodoDto } = command;
    const todo = new Todo();
    todo.categoryId = createTodoDto.categoryId;
    todo.userId = userId;
    todo.todoTitle = createTodoDto.todoTitle;
    todo.todoContent = createTodoDto.todoContent;
    todo.todoDate = new Date(createTodoDto.todoDate);
    todo.todoDone = false;

    const result = await this.todoRepository.save(todo);

    const redisKey = `todos:${userId}:${createTodoDto.todoDate}`;
    await this.client.del(redisKey);

    return result;
  }
}
