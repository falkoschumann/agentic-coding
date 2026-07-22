// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import type { TodoState } from "../../src/domain/todo.aggregate";
import {
  createDestroyTodo,
  destroyTodo,
} from "../../src/domain/destroy_todo.command";
import { createTodoDestroyed } from "../../src/domain/todo_destroyed.event";

describe("Destroy todo", () => {
  it("should destroy todo", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "foo",
        completed: false,
      },
      {
        id: 2,
        title: "bar",
        completed: true,
      },
    ];

    const command = createDestroyTodo({ id: 2 });
    const events = destroyTodo(state, command);

    expect(events).toEqual([createTodoDestroyed({ id: 2 })]);
  });

  it("should reject destroy for unknown id", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "foo",
        completed: false,
      },
    ];

    const command = createDestroyTodo({ id: 2 });
    const action = () => destroyTodo(state, command);

    expect(action).toThrow("todo-must-exist");
  });
});
