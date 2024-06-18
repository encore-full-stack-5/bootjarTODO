import { ICommand } from '@nestjs/cqrs';
import { CreateTodoDto } from '../../dto/create-todo.dto';

export class CreateTodoCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly createTodoDto: CreateTodoDto,
  ) {}
}
