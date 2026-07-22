// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface TodoAddedEvent {
  readonly type: "todo-added";
  readonly data: TodoAddedEventData;
}

export type TodoAddedEventData = Readonly<{
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
}>;

export function createTodoAdded(data: TodoAddedEventData): TodoAddedEvent {
  return {
    type: "todo-added",
    data,
  };
}
