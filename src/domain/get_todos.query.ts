// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate.ts";

export interface GetTodosQuery {
  readonly type: "get-todos";
  readonly data: GetTodosQueryData;
}

export type GetTodosQueryData = Readonly<{
  showing: "all" | "active" | "completed";
}>;

export function createGetTodosQuery(data: GetTodosQueryData): GetTodosQuery {
  return {
    type: "get-todos",
    data,
  };
}

export interface GetTodosQueryResult {
  readonly todos: TodoState[];
  readonly activeTodoCount: number;
  readonly completedCount: number;
}

export function createGetTodosQueryResult({
  todos = [],
  activeTodoCount = 0,
  completedCount = 0,
}: {
  todos?: TodoState[];
  activeTodoCount?: number;
  completedCount?: number;
} = {}): GetTodosQueryResult {
  return { todos, activeTodoCount, completedCount };
}

export function getTodos(
  state: TodoState[],
  query: GetTodosQuery,
): GetTodosQueryResult {
  const activeTodoCount = state.filter((todo) => !todo.completed).length;
  const completedCount = state.filter((todo) => todo.completed).length;
  const todos = state.filter((todo) => {
    switch (query.data.showing) {
      case "all":
        return true;
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
    }
  });

  return createGetTodosQueryResult({ todos, activeTodoCount, completedCount });
}
