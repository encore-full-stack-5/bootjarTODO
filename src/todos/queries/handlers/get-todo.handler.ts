import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { GetTodoQuery } from '../impl/get-todo.query';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetTodoDto } from '../../dto/get-todo.dto';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async execute(query: GetTodoQuery): Promise<GetTodoDto> {
    const { todoId } = query;
    const redisKey = `todo:${todoId}`;
    const cachedTodo = await this.client.get(redisKey);
    if (cachedTodo) {
      console.log('get todo from redis');
      return JSON.parse(cachedTodo);
    }

    console.log('get todo from mysql');
    const todo = await this.todoRepository.findOneBy({ todoId });

    const dto = new GetTodoDto();
    dto.categoryId = todo.categoryId;
    dto.todoTitle = todo.todoTitle;
    dto.todoContent = todo.todoContent;
    dto.todoDate = todo.todoDate.toString();
    dto.todoDone = todo.todoDone;

    await this.client.set(redisKey, JSON.stringify(dto), 'EX', 3600); // 1시간 유지
    return dto;
  }
}
