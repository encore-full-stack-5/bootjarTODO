import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DropTodosEvent } from '../impl/drop-todos.event';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@EventsHandler(DropTodosEvent)
export class DropTodosHandler implements IEventHandler<DropTodosEvent> {
  constructor(
    @InjectRedis()
    private readonly client: Redis,
  ) {}

  async execute(event: DropTodosEvent) {
    const { userId, date } = event;
  }
}
