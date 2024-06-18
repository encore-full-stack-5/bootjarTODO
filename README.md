## :open_file_folder: Project Structure

```markdown
src
├── todos
│   ├── commands
│   │   ├── handlers
│   │   │   ├── create-todo.handler.ts
│   │   │   └── index.ts
│   │   └── impl
│   │       └── create-todo.command.ts
│   ├── queries
│   │   ├── handlers
│   │   │   ├── get-todos.handler.ts
│   │   │   └── index.ts
│   │   └── impl
│   │       └── get-todos.query.ts
│   ├── events
│   │   ├── handlers
│   │   │   ├── drop-todos.handler.ts
│   │   │   └── index.ts
│   │   └── impl
│   │       └── drop-todos.event.ts
│   ├── dto
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
