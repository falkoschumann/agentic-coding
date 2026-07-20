// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface DestroyTodoCommand {
  readonly type: "destroy-todo";
  readonly data: DestroyTodoCommandData;
}

export type DestroyTodoCommandData = Readonly<{
  readonly id: number;
}>;
