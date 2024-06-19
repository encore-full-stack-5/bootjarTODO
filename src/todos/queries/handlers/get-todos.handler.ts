import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { GetTodosQuery } from '../impl/get-todos.query';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetTodosDto } from '../../dto/get-todos.dto';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async execute(query: GetTodosQuery): Promise<GetTodosDto[]> {
    const { userId, date } = query;
    const redisKey = `todos:${userId}:${date}`;
    const cachedTodos = await this.client.get(redisKey);
    if (cachedTodos) {
      console.log('aaa');
      return JSON.parse(cachedTodos);
    }

    console.log('bbb');
    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.user_id = :userId', { userId })
      .andWhere('todo.todo_date = :date', { date })
      .getMany();
    const dtoList = todos.map((todo) => {
      const dto = new GetTodosDto();
      dto.categoryId = todo.categoryId;
      dto.todoTitle = todo.todoTitle;
      dto.todoDate = date;
      dto.todoDone = todo.todoDone;
      return dto;
    });

    await this.client.set(redisKey, JSON.stringify(dtoList), 'EX', 3600); // 1시간 유지
    return dtoList;
    // return this.todoRepository.find({ where: { userId } });
  }
}
