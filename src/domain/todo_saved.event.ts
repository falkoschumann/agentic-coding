// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface TodoSavedEvent {
  readonly type: "todo-saved";
  readonly data: TodoSavedEventData;
}

export type TodoSavedEventData = Readonly<{
  readonly id: number;
  readonly title: string;
}>;

export function createTodoSaved(data: TodoSavedEventData): TodoSavedEvent {
  return {
    type: "todo-saved",
    data,
  };
}
