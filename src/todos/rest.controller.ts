import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDto } from './dto/user.dto';
import { SignupCommand } from './commands/impl/signup.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import { FriendDto } from './dto/friend.dto';
import { FriendAcceptCommand } from './commands/impl/friend-accept.command';
import { FriendDeleteCommand } from './commands/impl/friend-delete.command';

@Controller('todos')
export class RestController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('user-signup')
  async signup(@Body() userDto: UserDto) {
    await this.commandBus.execute(new SignupCommand(userDto));
  }
  @Put('user-update')
  async updateUser(@Body() userDto: UserDto) {
    await this.commandBus.execute(new UpdateUserCommand(userDto));
  }
  @Delete('user-delete/:userId')
  async deleteUser(@Param('userId') userId: number) {
    await this.commandBus.execute(new DeleteUserCommand(userId));
  }
  @Post('friend-add')
  async friendAccept(@Body() friendDto: FriendDto) {
    await this.commandBus.execute(new FriendAcceptCommand(friendDto));
  }
  @Delete('friend-delete/:user1Id/:user2Id')
  async friendDelete(
    @Param('user1Id') user1Id: number,
    @Param('user2Id') user2Id: number,
  ) {
    await this.commandBus.execute(new FriendDeleteCommand(user1Id, user2Id));
  }
}
