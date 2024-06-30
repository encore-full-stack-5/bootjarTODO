import { CreateTodoHandler } from './create-todo.handler';
import { UpdateTodoHandler } from './update-todo.handler';
import { DeleteTodoHandler } from './delete-todo.handler';
import { SignupHandler } from './signup.handler';
import { UpdateUserHandler } from './update-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { FriendAcceptHandler } from './friend-accept.handler';
import { FriendDeleteHandler } from './friend-delete.handler';
import { CheckTodoHandler } from "./check-todo.handler";

export const CommandHandlers = [
  CreateTodoHandler,
  UpdateTodoHandler,
  DeleteTodoHandler,
  SignupHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  FriendAcceptHandler,
  FriendDeleteHandler,
  CheckTodoHandler,
];
