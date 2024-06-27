## :open_file_folder: Project Structure

```markdown
src
├── todos
│   ├── commands
│   │   ├── handlers
│   │   │   ├── create-todo.handler.ts
│   │   │   ├── delete-todo.handler.ts
│   │   │   ├── update-todo.handler.ts
│   │   │   └── index.ts
│   │   └── impl
│   │       ├── create-todo.command.ts
│   │       ├── delete-todo.command.ts
│   │       └── update-todo.command.ts
│   ├── queries
│   │   ├── handlers
│   │   │   ├── get-my-todos.handler.ts
│   │   │   ├── get-friend-todos.handler.ts
│   │   │   ├── get-user-todos.handler.ts
│   │   │   ├── get-todo.handler.ts
│   │   │   └── index.ts
│   │   └── impl
│   │       ├── get-my-todos.query.ts
│   │       ├── get-friend-todos.query.ts
│   │       ├── get-user-todos.query.ts
│   │       └── get-todo.query.ts
│   ├── events
│   │   ├── handlers
│   │   │   ├── drop-todos.handler.ts
│   │   │   ├── drop-todo.handler.ts
│   │   │   └── index.ts
│   │   └── impl
│   │       ├── drop-todos.event.ts
│   │       └── drop-todo.event.ts
│   ├── dto
│   │   ├── get-todos.dto.ts
│   │   ├── get-todo.dto.ts
│   │   ├── create-todo.dto.ts
│   │   └── update-todo.dto.ts
│   ├── entities
│   │   ├── category.entity.ts
│   │   ├── todos.entity.ts
│   │   └── user.entity.ts
│   ├── todos.controller.ts
│   └── todos.module.ts
├── app.module.ts
└── main.ts
```
