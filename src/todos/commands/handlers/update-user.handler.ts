import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserCommand } from '../impl/update-user.command';
import { User } from '../../entities/user.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateUserCommand) {
    const { userDto } = command;
    const user = await this.userRepository.findOneBy({
      userId: userDto.userId,
    });
    user.userNickname = userDto.nickname;
    user.userPublicScope = userDto.publicScope;

    await this.userRepository.save(user);
  }
}
