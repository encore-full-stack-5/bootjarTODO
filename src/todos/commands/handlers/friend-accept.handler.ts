import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendAcceptCommand } from '../impl/friend-accept.command';
import { Friend } from '../../entities/friend.entity';

@CommandHandler(FriendAcceptCommand)
export class FriendAcceptHandler
  implements ICommandHandler<FriendAcceptCommand>
{
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async execute(command: FriendAcceptCommand) {
    const { friendDto } = command;

    await this.friendRepository.save(
      new Friend(friendDto.user1Id, friendDto.user2Id),
    );
    await this.friendRepository.save(
      new Friend(friendDto.user2Id, friendDto.user1Id),
    );
  }
}
