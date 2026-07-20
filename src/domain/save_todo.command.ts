// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface SaveTodoCommand {
  readonly type: "save-todo";
  readonly data: SaveTodoCommandData;
}

export type SaveTodoCommandData = Readonly<{
  readonly id: number;
  readonly title: string;
}>;
