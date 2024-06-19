import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { DropTodosEvent } from '../../events/impl/drop-todos.event';
import { UpdateTodoCommand } from '../impl/update-todo.command';
import { DropTodoEvent } from "../../events/impl/drop-todo.event";

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateTodoCommand): Promise<Todo> {
    const { todoId, updateTodoDto } = command;
    const todo = await this.todoRepository.findOneBy({ todoId });
    const beforeDate = todo.todoDate.toString();

    todo.categoryId = updateTodoDto.categoryId;
    todo.todoTitle = updateTodoDto.todoTitle;
    todo.todoContent = updateTodoDto.todoContent;
    todo.todoDate = new Date(updateTodoDto.todoDate);
    todo.todoDone = updateTodoDto.todoDone;

    const result = await this.todoRepository.save(todo);
    this.eventBus.publish(new DropTodosEvent(todo.userId, beforeDate));
    this.eventBus.publish(new DropTodoEvent(todo.todoId));

    return result;
  }
}
