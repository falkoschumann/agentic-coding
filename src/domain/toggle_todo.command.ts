// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface ToggleTodoCommand {
  readonly type: "toggle-todo";
  readonly data: ToggleTodoCommandData;
}

export type ToggleTodoCommandData = Readonly<{
  readonly id: number;
}>;
