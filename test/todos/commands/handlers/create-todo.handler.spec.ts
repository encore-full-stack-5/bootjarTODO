import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { CreateTodoHandler } from 'src/todos/commands/handlers/create-todo.handler';
import { CreateTodoCommand } from 'src/todos/commands/impl/create-todo.command';
import { Todo } from 'src/todos/entities/todos.entity';
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';
import { DropTodosEvent } from 'src/todos/events/impl/drop-todos.event';

describe('CreateTodoHandler', () => {
  let handler: CreateTodoHandler;
  let repository: Repository<Todo>;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTodoHandler,
        // {
        //   provide: getRepositoryToken(Todo),
        //   useValue: {
        //     save: jest.fn(),
        //   },
        // },
        // {
        //   provide: EventBus,
        //   useValue: {
        //     publish: jest.fn(),
        //   },
        // },
      ],
    }).compile();

    handler = module.get<CreateTodoHandler>(CreateTodoHandler);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create a todo and publish an event', async () => {
    const userId = 1;
    const createTodoDto: CreateTodoDto = {
      categoryId: 1,
      todoTitle: 'Test Todo',
      todoContent: 'This is a test',
      todoDate: '2024-06-18',
    };
    const command = new CreateTodoCommand(userId, createTodoDto);
    const savedTodo = new Todo();
    (repository.save as jest.Mock).mockResolvedValue(savedTodo);

    const result = await handler.execute(command);

    expect(repository.save).toHaveBeenCalledWith(expect.any(Todo));
    expect(eventBus.publish).toHaveBeenCalledWith(
      new DropTodosEvent(userId, createTodoDto.todoDate),
    );
    expect(result).toBe(savedTodo);
  });
});
