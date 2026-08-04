// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { createTodo } from "../../src/domain/todo.aggregate";
import { TodoRepository } from "../../src/infrastructure/todo.repository";

describe("Todos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store and load todos", async () => {
    const repository = TodoRepository.create();
    const todos = [
      createTodo({
        id: 1,
        title: "foo",
      }),
      createTodo({
        id: 2,
        title: "bar",
        completed: true,
      }),
    ];

    await repository.store(todos);
    const result = await repository.load();

    expect(result).toEqual(todos);
  });

  it("should load empty when no todos are stored", async () => {
    const repository = TodoRepository.create();

    const result = await repository.load();

    expect(result).toEqual([]);
  });
});
