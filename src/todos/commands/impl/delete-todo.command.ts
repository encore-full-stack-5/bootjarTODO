import { ICommand } from '@nestjs/cqrs';

export class DeleteTodoCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly todoId: number,
  ) {}
}
