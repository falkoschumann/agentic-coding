// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import type { TodoState } from "../../src/domain/todo.aggregate";
import {
  createGetTodosQuery,
  createGetTodosQueryResult,
  getTodos,
} from "../../src/domain/get_todos.query";

describe("Get todos", () => {
  it("should show all todos", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "a",
        completed: true,
      },
      {
        id: 2,
        title: "b",
        completed: true,
      },
      {
        id: 3,
        title: "c",
        completed: false,
      },
    ];

    const query = createGetTodosQuery({ showing: "all" });
    const result = getTodos(state, query);

    expect(result).toEqual(
      createGetTodosQueryResult({
        todos: state,
        activeTodoCount: 1,
        completedCount: 2,
      }),
    );
  });

  it("should show active todos", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "a",
        completed: true,
      },
      {
        id: 2,
        title: "b",
        completed: true,
      },
      {
        id: 3,
        title: "c",
        completed: false,
      },
    ];

    const query = createGetTodosQuery({ showing: "active" });
    const result = getTodos(state, query);

    expect(result).toEqual(
      createGetTodosQueryResult({
        todos: [
          {
            id: 3,
            title: "c",
            completed: false,
          },
        ],
        activeTodoCount: 1,
        completedCount: 2,
      }),
    );
  });

  it("should show completed todos", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "a",
        completed: true,
      },
      {
        id: 2,
        title: "b",
        completed: true,
      },
      {
        id: 3,
        title: "c",
        completed: false,
      },
    ];

    const query = createGetTodosQuery({ showing: "completed" });
    const result = getTodos(state, query);

    expect(result).toEqual(
      createGetTodosQueryResult({
        todos: [
          {
            id: 1,
            title: "a",
            completed: true,
          },
          {
            id: 2,
            title: "b",
            completed: true,
          },
        ],
        activeTodoCount: 1,
        completedCount: 2,
      }),
    );
  });

  it("should return no todos when none exist", () => {
    const state: TodoState[] = [];

    const query = createGetTodosQuery({ showing: "all" });
    const result = getTodos(state, query);

    expect(result).toEqual(createGetTodosQueryResult());
  });
});
