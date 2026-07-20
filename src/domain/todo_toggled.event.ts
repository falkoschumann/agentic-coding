// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface TodoToggledEvent {
  readonly type: "todo-toggled";
  readonly data: TodoToggledEventData;
}

export type TodoToggledEventData = Readonly<{
  readonly id: number;
}>;
