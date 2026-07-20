// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate.ts";

export interface GetTodosQuery {
  readonly type: "get-todos";
  readonly data: GetTodosQueryData;
}

export type GetTodosQueryData = Readonly<{
  showing: "all" | "active" | "completed";
}>;

export interface GetTodosQueryResult {
  readonly todos: TodoState[];
}
