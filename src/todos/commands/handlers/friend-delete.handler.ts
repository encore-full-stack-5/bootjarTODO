import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendDeleteCommand } from '../impl/friend-delete.command';
import { Friend } from '../../entities/friend.entity';

@CommandHandler(FriendDeleteCommand)
export class FriendDeleteHandler
  implements ICommandHandler<FriendDeleteCommand>
{
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async execute(command: FriendDeleteCommand) {
    const { user1Id, user2Id } = command;

    await this.friendRepository.delete({ user1Id: user1Id, user2Id: user2Id });
    await this.friendRepository.delete({ user1Id: user2Id, user2Id: user1Id });
  }
}
