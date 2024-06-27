import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { GetUserTodosQuery } from '../impl/get-user-todos.query';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetTodosDto } from '../../dto/get-todos.dto';
import { Friend } from '../../entities/friend.entity';
import { User } from '../../entities/user.entity';
import { UserNotFoundError } from '../../error/user-not-found.error';
import { PublicScopeError } from '../../error/public-scope.error';

@QueryHandler(GetUserTodosQuery)
export class GetUserTodosHandler implements IQueryHandler<GetUserTodosQuery> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async execute(query: GetUserTodosQuery): Promise<GetTodosDto[]> {
    const { myId, userId, date } = query;

    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new UserNotFoundError();
    }
    if (!user.userPublicScope) {
      const friend = await this.friendRepository.findOne({
        where: { user1Id: myId, user2Id: userId },
      });
      if (!friend) {
        throw new PublicScopeError();
      }
    }

    const redisKey = `todos:${userId}:${date}`;
    const cachedTodos = await this.client.get(redisKey);
    if (cachedTodos) {
      return JSON.parse(cachedTodos);
    }

    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.user_id = :userId', { userId })
      .andWhere('todo.todo_date = :date', { date })
      .getMany();
    const dtoList = todos.map((todo) => GetTodosDto.from(todo, date));

    await this.client.set(redisKey, JSON.stringify(dtoList), 'EX', 3600);
    return dtoList;
  }
}
