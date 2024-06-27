import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { GetFriendTodosQuery } from '../impl/get-friend-todos.query';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetTodosDto } from '../../dto/get-todos.dto';
import { Friend } from '../../entities/friend.entity';
import { NotFriendError } from '../../error';
import { User } from '../../entities/user.entity';
import { UserNotFoundError } from '../../error/user-not-found.error';

@QueryHandler(GetFriendTodosQuery)
export class GetFriendTodosHandler
  implements IQueryHandler<GetFriendTodosQuery>
{
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

  async execute(query: GetFriendTodosQuery): Promise<GetTodosDto[]> {
    const { myId, friendId, date } = query;

    const user = await this.userRepository.findOne({
      where: { userId: friendId },
    });
    if (!user) {
      throw new UserNotFoundError();
    }
    const friend = await this.friendRepository.findOne({
      where: { user1Id: myId, user2Id: friendId },
    });
    if (!friend) {
      throw new NotFriendError();
    }
    const redisKey = `todos:${friendId}:${date}`;
    const cachedTodos = await this.client.get(redisKey);
    if (cachedTodos) {
      return JSON.parse(cachedTodos);
    }

    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.user_id = :friendId', { friendId })
      .andWhere('todo.todo_date = :date', { date })
      .getMany();
    const dtoList = todos.map((todo) => GetTodosDto.from(todo, date));

    await this.client.set(redisKey, JSON.stringify(dtoList), 'EX', 3600);
    return dtoList;
  }
}
