// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import { createTodo } from "../../src/domain/todo.aggregate";
import {
  toggleTodo,
  createToggleTodo,
} from "../../src/domain/toggle_todo.command";
import { createTodoToggled } from "../../src/domain/todo_toggled.event";

describe("Toggle todo", () => {
  it("should toggle todo", () => {
    const state = [
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

    const command = createToggleTodo({ id: 1 });
    const events = toggleTodo(state, command);

    expect(events).toEqual([createTodoToggled({ id: 1, completed: true })]);
  });

  it("should reject toggle for unknown id", () => {
    const state = [
      createTodo({
        id: 1,
        title: "foo",
      }),
    ];

    const command = createToggleTodo({ id: 2 });
    const action = () => toggleTodo(state, command);

    expect(action).toThrow("todo-must-exist");
  });
});
