import { ICommand } from '@nestjs/cqrs';
import { FriendDto } from '../../dto/friend.dto';

export class FriendAcceptCommand implements ICommand {
  constructor(public readonly friendDto: FriendDto) {}
}
