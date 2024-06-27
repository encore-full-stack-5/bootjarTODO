import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDto } from './dto/user.dto';
import { SignupCommand } from './commands/impl/signup.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { DeleteUserCommand } from './commands/impl/delete-user.command';

@Controller('todos')
export class RestController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('user-signup')
  async signup(@Body() userDto: UserDto) {
    await this.commandBus.execute(new SignupCommand(userDto));
  }
  @Put('user-update')
  async update(@Body() userDto: UserDto) {
    await this.commandBus.execute(new UpdateUserCommand(userDto));
  }
  @Delete('user-delete/:userId')
  async delete(@Param('userId') userId: number) {
    await this.commandBus.execute(new DeleteUserCommand(userId));
  }
}
