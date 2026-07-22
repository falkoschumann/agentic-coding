// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate";
import { createTodoToggled, type TodoToggledEvent } from "./todo_toggled.event";

export interface ToggleTodoCommand {
  readonly type: "toggle-todo";
  readonly data: ToggleTodoCommandData;
}

export type ToggleTodoCommandData = Readonly<{
  readonly id: number;
}>;

export function createToggleTodo(
  data: ToggleTodoCommandData,
): ToggleTodoCommand {
  return {
    type: "toggle-todo",
    data,
  };
}

export function toggleTodo(
  state: TodoState[],
  command: ToggleTodoCommand,
): TodoToggledEvent[] {
  const todo = state.find((todo) => todo.id === command.data.id);
  if (todo == null) {
    throw new Error("todo-must-exist");
  }

  const event = createTodoToggled({
    id: command.data.id,
    completed: !todo.completed,
  });
  return [event];
}
