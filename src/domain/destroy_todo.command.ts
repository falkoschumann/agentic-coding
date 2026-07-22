// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate";
import {
  createTodoDestroyed,
  type TodoDestroyedEvent,
} from "./todo_destroyed.event";

export interface DestroyTodoCommand {
  readonly type: "destroy-todo";
  readonly data: DestroyTodoCommandData;
}

export type DestroyTodoCommandData = Readonly<{
  readonly id: number;
}>;

export function createDestroyTodo(
  data: DestroyTodoCommandData,
): DestroyTodoCommand {
  return {
    type: "destroy-todo",
    data,
  };
}

export function destroyTodo(
  state: TodoState[],
  command: DestroyTodoCommand,
): TodoDestroyedEvent[] {
  const todo = state.find((todo) => todo.id === command.data.id);
  if (todo == null) {
    throw new Error("todo-must-exist");
  }

  const event = createTodoDestroyed({
    id: command.data.id,
  });
  return [event];
}
