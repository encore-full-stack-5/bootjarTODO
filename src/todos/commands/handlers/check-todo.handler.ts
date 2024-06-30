import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { DropTodosEvent } from '../../events/impl/drop-todos.event';
import { CheckTodoCommand } from '../impl/check-todo.command';
import { DropTodoEvent } from '../../events/impl/drop-todo.event';
import { TodoPermissonError } from '../../error/todo-permisson.error';

@CommandHandler(CheckTodoCommand)
export class CheckTodoHandler implements ICommandHandler<CheckTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CheckTodoCommand): Promise<Todo> {
    const { userId, todoId } = command;
    const todo = await this.todoRepository.findOneBy({ todoId });
    if (todo.userId !== userId) {
      throw new TodoPermissonError();
    }
    todo.todoDone = !todo.todoDone;

    const result = await this.todoRepository.save(todo);
    this.eventBus.publish(
      new DropTodosEvent(todo.userId, todo.todoDate.toString()),
    );
    this.eventBus.publish(new DropTodoEvent(todo.todoId));

    return result;
  }
}
