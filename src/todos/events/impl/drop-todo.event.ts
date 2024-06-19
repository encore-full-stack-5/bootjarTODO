import { IEvent } from '@nestjs/cqrs';

export class DropTodoEvent implements IEvent {
  constructor(public readonly todoId: number) {}
}
