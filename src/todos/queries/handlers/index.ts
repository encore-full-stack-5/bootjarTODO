import { GetMyTodosHandler } from './get-my-todos.handler';
import { GetTodoHandler } from './get-todo.handler';
import { GetFriendTodosHandler } from './get-friend-todos.handler';
import { GetUserTodosHandler } from './get-user-todos.handler';

export const QueryHandlers = [
  GetMyTodosHandler,
  GetTodoHandler,
  GetFriendTodosHandler,
  GetUserTodosHandler,
];
