import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DropTodoEvent } from '../impl/drop-todo.event';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@EventsHandler(DropTodoEvent)
export class DropTodoHandler implements IEventHandler<DropTodoEvent> {
  constructor(
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async handle(event: DropTodoEvent) {
    const { todoId } = event;
    const redisKey = `todo:${todoId}`;
    await this.client.del(redisKey);
  }
}
