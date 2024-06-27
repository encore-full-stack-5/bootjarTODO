import { ICommand } from '@nestjs/cqrs';
import { UserDto } from '../../dto/user.dto';

export class SignupCommand implements ICommand {
  constructor(public readonly userDto: UserDto) {}
}
