// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { GetTodosQueryHandler } from "../../src/application/get_todos.query_handler";
import { createTodo } from "../../src/domain/todo.aggregate";
import {
  createGetTodosQuery,
  createGetTodosQueryResult,
} from "../../src/domain/get_todos.query";
import { TodoRepository } from "../../src/infrastructure/todo.repository";

describe("Get todos", () => {
  beforeEach(() => {
    const repository = TodoRepository.create();
    repository.clear();
  });

  it("should show all todos", async () => {
    const { handler, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "a",
        completed: true,
      }),
      createTodo({
        id: 2,
        title: "b",
        completed: true,
      }),
      createTodo({
        id: 3,
        title: "c",
      }),
    ]);

    const query = createGetTodosQuery({ showing: "all" });
    const result = await handler.handle(query);

    expect(result).toEqual(
      createGetTodosQueryResult({
        todos: [
          createTodo({
            id: 1,
            title: "a",
            completed: true,
          }),
          createTodo({
            id: 2,
            title: "b",
            completed: true,
          }),
          createTodo({
            id: 3,
            title: "c",
          }),
        ],
        activeTodoCount: 1,
        completedCount: 2,
      }),
    );
  });

  it("should show active todos", async () => {
    const { handler, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "a",
        completed: true,
      }),
      createTodo({
        id: 2,
        title: "b",
        completed: true,
      }),
      createTodo({
        id: 3,
        title: "c",
      }),
    ]);

    const query = createGetTodosQuery({ showing: "active" });
    const result = await handler.handle(query);

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

  it("should show completed todos", async () => {
    const { handler, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "a",
        completed: true,
      }),
      createTodo({
        id: 2,
        title: "b",
        completed: true,
      }),
      createTodo({
        id: 3,
        title: "c",
      }),
    ]);

    const query = createGetTodosQuery({ showing: "completed" });
    const result = await handler.handle(query);

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

  it("should return no todos when none exist", async () => {
    const { handler } = configure();

    const query = createGetTodosQuery({ showing: "all" });
    const result = await handler.handle(query);

    expect(result).toEqual(createGetTodosQueryResult());
  });
});

function configure() {
  const todoRepository = TodoRepository.create();
  const handler = GetTodosQueryHandler.create({ todoRepository });
  return { handler, todoRepository };
}
