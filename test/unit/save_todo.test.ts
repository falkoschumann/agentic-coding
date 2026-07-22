// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import type { TodoState } from "../../src/domain/todo.aggregate";
import { saveTodo, createSaveTodo } from "../../src/domain/save_todo.command";
import { createTodoSaved } from "../../src/domain/todo_saved.event";

describe("Save todo", () => {
  it("should save todo", () => {
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

    const command = createSaveTodo({ id: 1, title: "lorem ipsum" });
    const events = saveTodo(state, command);

    expect(events).toEqual([createTodoSaved({ id: 1, title: "lorem ipsum" })]);
  });

  it("should reject save with empty title", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "foo",
        completed: false,
      },
    ];

    const command = createSaveTodo({ id: 1, title: "" });
    const action = () => saveTodo(state, command);

    expect(action).toThrow("title-must-not-be-empty");
  });

  it("should reject save with whitespace title", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "foo",
        completed: false,
      },
    ];

    const command = createSaveTodo({ id: 1, title: "   " });
    const action = () => saveTodo(state, command);

    expect(action).toThrow("title-must-not-be-empty");
  });

  it("should reject save for unknown id", () => {
    const state: TodoState[] = [
      {
        id: 1,
        title: "foo",
        completed: false,
      },
    ];

    const command = createSaveTodo({ id: 2, title: "lorem ipsum" });
    const action = () => saveTodo(state, command);

    expect(action).toThrow("todo-must-exist");
  });
});
