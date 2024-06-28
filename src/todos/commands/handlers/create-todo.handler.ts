import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todos.entity';
import { CreateTodoCommand } from '../impl/create-todo.command';
import { DropTodosEvent } from '../../events/impl/drop-todos.event';
import { CreateTodoDto } from '../../dto/create-todo.dto';
import { HttpService } from '@nestjs/axios';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly eventBus: EventBus,
    private readonly httpService: HttpService,
  ) {}

  async execute(command: CreateTodoCommand): Promise<Todo> {
    const { userId, createTodoDto } = command;
    const todo = this.toEntity(createTodoDto, userId);

    const result = await this.todoRepository.save(todo);
    this.eventBus.publish(new DropTodosEvent(userId, createTodoDto.todoDate));
    this.httpService.post('http://34.31.174.33/todos/comments/todo-add', {
      todoId: result.todoId,
    });

    return result;
  }

  toEntity(dto: CreateTodoDto, userId: number) {
    const todo = new Todo();
    todo.categoryId = dto.categoryId;
    todo.userId = userId;
    todo.todoTitle = dto.todoTitle;
    todo.todoContent = dto.todoContent;
    todo.todoDate = new Date(dto.todoDate);
    todo.todoDone = false;
    return todo;
  }
}
