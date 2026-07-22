// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate";
import { createTodoSaved, type TodoSavedEvent } from "./todo_saved.event";

export interface SaveTodoCommand {
  readonly type: "save-todo";
  readonly data: SaveTodoCommandData;
}

export type SaveTodoCommandData = Readonly<{
  readonly id: number;
  readonly title: string;
}>;

export function createSaveTodo(data: SaveTodoCommandData): SaveTodoCommand {
  return {
    type: "save-todo",
    data,
  };
}

export function saveTodo(
  state: TodoState[],
  command: SaveTodoCommand,
): TodoSavedEvent[] {
  const todo = state.find((todo) => todo.id === command.data.id);
  if (todo == null) {
    throw new Error("todo-must-exist");
  }

  if (command.data.title.trim() === "") {
    throw new TypeError("title-must-not-be-empty");
  }

  const event = createTodoSaved({
    id: command.data.id,
    title: command.data.title,
  });
  return [event];
}
