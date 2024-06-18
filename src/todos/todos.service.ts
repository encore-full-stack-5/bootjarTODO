import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Redis from 'ioredis';
import { Todo } from './entities/todos.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async findAll(userId: number, date: string): Promise<Todo[]> {
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

    await this.client.set(redisKey, JSON.stringify(todos), 'EX', 3600); // 1시간 유지
    return todos;
  }
  async create(userId: number, createTodoDto: CreateTodoDto) {
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
