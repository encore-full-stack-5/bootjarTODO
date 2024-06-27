import { ICommand } from '@nestjs/cqrs';

export class FriendDeleteCommand implements ICommand {
  constructor(
    public readonly user1Id: number,
    public readonly user2Id: number,
  ) {}
}
