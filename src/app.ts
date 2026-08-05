// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { AddTodoCommandHandler } from "./application/add_todo.command_handler";
import { ClearCompletedCommandHandler } from "./application/clear_completed.command_handler";
import { DestroyTodoCommandHandler } from "./application/destroy_todo.command_handler";
import { GetTodosQueryHandler } from "./application/get_todos.query_handler";
import { SaveTodoCommandHandler } from "./application/save_todo.command_handler";
import { ToggleAllCommandHandler } from "./application/toggle_all.command_handler";
import { ToggleTodoCommandHandler } from "./application/toggle_todo.command_handler";
import { TodoRepository } from "./infrastructure/todo.repository";
import { EventBus, type Event, type EventHandler } from "./shared/event_bus";
import { MessageRouter, type Message } from "./shared/message_router";

export interface App {
  routeMessage<TResponse = unknown>(message: Message): Promise<TResponse>;

  subscribeEvent<TEvent extends Event>(
    handler: EventHandler<TEvent>,
  ): () => void;
}

declare global {
  interface Window {
    todos: App;
  }
}

const eventBus = EventBus.create();

const todoRepository = TodoRepository.create();

const messageRouter = MessageRouter.create();
messageRouter.register(
  "add-todo",
  AddTodoCommandHandler.create({ eventBus, todoRepository }),
);
messageRouter.register(
  "clear-completed",
  ClearCompletedCommandHandler.create({ eventBus, todoRepository }),
);
messageRouter.register(
  "destroy-todo",
  DestroyTodoCommandHandler.create({ eventBus, todoRepository }),
);
messageRouter.register(
  "get-todos",
  GetTodosQueryHandler.create({ todoRepository }),
);
messageRouter.register(
  "save-todo",
  SaveTodoCommandHandler.create({ eventBus, todoRepository }),
);
messageRouter.register(
  "toggle-all",
  ToggleAllCommandHandler.create({ eventBus, todoRepository }),
);
messageRouter.register(
  "toggle-todo",
  ToggleTodoCommandHandler.create({ eventBus, todoRepository }),
);

window.todos = {
  routeMessage: (message) => messageRouter.route(message),
  subscribeEvent: (handler) => eventBus.subscribe(handler),
};
