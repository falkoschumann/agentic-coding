// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import type { TodoState } from "../../src/domain/todo.aggregate";
import {
  toggleAll,
  createToggleAll,
} from "../../src/domain/toggle_all.command";
import { createAllToggled } from "../../src/domain/all_toggled.event";

describe("Toggle all", () => {
  it("should toggle all", () => {
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

    const command = createToggleAll({ checked: true });
    const events = toggleAll(state, command);

    expect(events).toEqual([createAllToggled({ checked: true })]);
  });
});
