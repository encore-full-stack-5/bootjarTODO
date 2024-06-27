import { IQuery } from '@nestjs/cqrs';

export class GetFriendTodosQuery implements IQuery {
  constructor(
    public readonly myId: number,
    public readonly friendId: number,
    public readonly date: string,
  ) {}
}
