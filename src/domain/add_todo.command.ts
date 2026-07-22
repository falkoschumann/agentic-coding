// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate";
import { createTodoAdded, type TodoAddedEvent } from "./todo_added.event";

export interface AddTodoCommand {
  readonly type: "add-todo";
  readonly data: AddTodoCommandData;
}

export type AddTodoCommandData = Readonly<{
  readonly title: string;
}>;

export function createAddTodo(data: AddTodoCommandData): AddTodoCommand {
  return {
    type: "add-todo",
    data,
  };
}

export function addTodo(
  state: TodoState[],
  command: AddTodoCommand,
): TodoAddedEvent[] {
  if (command.data.title.trim() === "") {
    throw new TypeError("title-must-not-be-empty");
  }

  const lastId = state
    .map((todo) => todo.id)
    .reduce((max, id) => Math.max(max, id), 0);
  const event = createTodoAdded({
    id: lastId + 1,
    title: command.data.title,
    completed: false,
  });
  return [event];
}
