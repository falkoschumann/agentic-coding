// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate";
import {
  type CompletedClearedEvent,
  createCompletedCleared,
} from "./completed_cleared.event";

export interface ClearCompletedCommand {
  readonly type: "clear-completed";
  readonly data: object;
}

export function createClearCompleted(): ClearCompletedCommand {
  return {
    type: "clear-completed",
    data: {},
  };
}

export function clearCompleted(
  state: TodoState[],
  _command: ClearCompletedCommand,
): CompletedClearedEvent[] {
  const ids = state.filter((todo) => todo.completed).map((todo) => todo.id);
  const event = createCompletedCleared({ ids });
  return [event];
}
