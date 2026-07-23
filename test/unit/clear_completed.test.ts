// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import { createTodo } from "../../src/domain/todo.aggregate";
import {
  clearCompleted,
  createClearCompleted,
} from "../../src/domain/clear_completed.command";
import { createCompletedCleared } from "../../src/domain/completed_cleared.event";

describe("Clear completed", () => {
  it("should clear completed", () => {
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

    const command = createClearCompleted();
    const events = clearCompleted(state, command);

    expect(events).toEqual([createCompletedCleared({ ids: [2] })]);
  });
});
