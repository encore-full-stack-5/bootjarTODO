import { ICommand } from '@nestjs/cqrs';
import { UserDto } from '../../dto/user.dto';

export class UpdateUserCommand implements ICommand {
  constructor(public readonly userDto: UserDto) {}
}
