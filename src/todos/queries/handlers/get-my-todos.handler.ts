import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { GetMyTodosQuery } from '../impl/get-my-todos.query';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetTodosDto } from '../../dto/get-todos.dto';

@QueryHandler(GetMyTodosQuery)
export class GetMyTodosHandler implements IQueryHandler<GetMyTodosQuery> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async execute(query: GetMyTodosQuery): Promise<GetTodosDto[]> {
    const { myId, date } = query;
    const redisKey = `todos:${myId}:${date}`;
    const cachedTodos = await this.client.get(redisKey);
    if (cachedTodos) {
      return JSON.parse(cachedTodos);
    }

    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.user_id = :myId', { myId })
      .andWhere('todo.todo_date = :date', { date })
      .getMany();
    const dtoList = todos.map((todo) => GetTodosDto.from(todo, date));

    await this.client.set(redisKey, JSON.stringify(dtoList), 'EX', 3600);
    return dtoList;
  }
}
