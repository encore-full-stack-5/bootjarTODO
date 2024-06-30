import { ICommand } from '@nestjs/cqrs';

export class CheckTodoCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly todoId: number,
  ) {}
}
