import { IQuery } from '@nestjs/cqrs';

export class GetMyTodosQuery implements IQuery {
  constructor(
    public readonly myId: number,
    public readonly date: string,
  ) {}
}
