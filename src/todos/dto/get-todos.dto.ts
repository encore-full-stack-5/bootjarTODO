import { Todo } from '../entities/todos.entity';

export class GetTodosDto {
  todoId: number;
  categoryId: number;
  todoTitle: string;
  todoDate: string;
  todoDone: boolean;

  static from(todo: Todo, date: string): GetTodosDto {
    const dto = new GetTodosDto();
    dto.todoId = todo.todoId;
    dto.categoryId = todo.categoryId;
    dto.todoTitle = todo.todoTitle;
    dto.todoDate = date;
    dto.todoDone = todo.todoDone;
    return dto;
  }
}
