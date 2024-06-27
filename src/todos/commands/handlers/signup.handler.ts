import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupCommand } from '../impl/signup.command';
import { User } from '../../entities/user.entity';
import { UserDto } from '../../dto/user.dto';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: SignupCommand) {
    const { userDto } = command;
    const user = this.toEntity(userDto);

    await this.userRepository.save(user);
  }

  toEntity(dto: UserDto) {
    const user = new User();
    user.userId = dto.userId;
    user.userNickname = dto.nickname;
    user.userPublicScope = dto.publicScope;
    return user;
  }
}
