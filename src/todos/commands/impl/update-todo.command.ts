import { ICommand } from '@nestjs/cqrs';
import { UpdateTodoDto } from '../../dto/update-todo.dto';

export class UpdateTodoCommand implements ICommand {
  constructor(
    public readonly todoId: number,
    public readonly updateTodoDto: UpdateTodoDto,
  ) {}
}
