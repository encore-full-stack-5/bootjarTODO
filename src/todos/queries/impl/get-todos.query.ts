import { IQuery } from '@nestjs/cqrs';

export class GetTodosQuery implements IQuery {
  constructor(
    public readonly userId: number,
    public readonly date: string,
  ) {}
}
