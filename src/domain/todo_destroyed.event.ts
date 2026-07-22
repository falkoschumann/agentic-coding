// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface TodoDestroyedEvent {
  readonly type: "todo-destroyed";
  readonly data: TodoDestroyedEventData;
}

export type TodoDestroyedEventData = Readonly<{
  readonly id: number;
}>;

export function createTodoDestroyed(
  data: TodoDestroyedEventData,
): TodoDestroyedEvent {
  return {
    type: "todo-destroyed",
    data,
  };
}
