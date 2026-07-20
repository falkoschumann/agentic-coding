// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface AddTodoCommand {
  readonly type: "add-todo";
  readonly data: AddTodoCommandData;
}

export type AddTodoCommandData = Readonly<{
  readonly title: string;
}>;
