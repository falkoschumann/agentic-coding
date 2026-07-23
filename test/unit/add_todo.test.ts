// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import { createTodo, type TodoState } from "../../src/domain/todo.aggregate";
import { addTodo, createAddTodo } from "../../src/domain/add_todo.command";
import { createTodoAdded } from "../../src/domain/todo_added.event";

describe("Add todo", () => {
  it("should add todo", () => {
    const state: TodoState[] = [];

    const command = createAddTodo({ title: "foobar" });
    const events = addTodo(state, command);

    expect(events).toEqual([
      createTodoAdded({ id: 1, title: "foobar", completed: false }),
    ]);
  });

  it("should auto increment todo ID", () => {
    const state = [
      createTodo({
        id: 1,
        title: "foo",
      }),
    ];

    const command = createAddTodo({ title: "bar" });
    const events = addTodo(state, command);

    expect(events).toEqual([
      createTodoAdded({ id: 2, title: "bar", completed: false }),
    ]);
  });

  it("should reject add todo with empty title", () => {
    const state: TodoState[] = [];

    const command = createAddTodo({ title: "" });
    const action = () => addTodo(state, command);

    expect(action).toThrow("title-must-not-be-empty");
  });

  it("should reject add todo with whitespace title", () => {
    const state: TodoState[] = [];

    const command = createAddTodo({ title: "   " });
    const action = () => addTodo(state, command);

    expect(action).toThrow("title-must-not-be-empty");
  });
});
