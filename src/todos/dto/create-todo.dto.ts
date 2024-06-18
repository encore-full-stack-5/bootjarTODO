import { Todo } from "../entities/todos.entity";

export class CreateTodoDto {
  categoryId: number;
  todoTitle: string;
  todoContent: string;
  todoDate: string;

  toEntity(userId: number) {
    const todo = new Todo();
    todo.categoryId = this.categoryId;
    todo.userId = userId;
    todo.todoTitle = this.todoTitle;
    todo.todoContent = this.todoContent;
    todo.todoDate = new Date(this.todoDate);
    todo.todoDone = false;
    return todo;
  }
}
