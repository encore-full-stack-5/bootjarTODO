import { IEvent } from '@nestjs/cqrs';

export class DropTodosEvent implements IEvent {
  constructor(
    public readonly userId: number,
    public readonly date: string,
  ) {}
}
