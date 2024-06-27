import { IQuery } from '@nestjs/cqrs';

export class GetUserTodosQuery implements IQuery {
  constructor(
    public readonly userId: number,
    public readonly date: string,
  ) {}
}
