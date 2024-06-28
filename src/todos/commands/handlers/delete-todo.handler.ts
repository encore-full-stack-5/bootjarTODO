import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { DropTodosEvent } from '../../events/impl/drop-todos.event';
import { DropTodoEvent } from '../../events/impl/drop-todo.event';
import { DeleteTodoCommand } from '../impl/delete-todo.command';
import { HttpService } from '@nestjs/axios';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly eventBus: EventBus,
    private readonly httpService: HttpService,
  ) {}

  async execute(command: DeleteTodoCommand) {
    const { todoId } = command;
    const todo = await this.todoRepository.findOneBy({ todoId });
    const date = todo.todoDate.toString();

    await this.todoRepository.delete(todoId);
    this.eventBus.publish(new DropTodosEvent(todo.userId, date));
    this.eventBus.publish(new DropTodoEvent(todo.todoId));
    this.httpService.axiosRef.delete(
      `http://34.31.174.33/todos/comments/todo-delete/${todoId}`,
    );
  }
}
