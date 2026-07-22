// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "./todo.aggregate";
import { createAllToggled, type AllToggledEvent } from "./all_toggled.event";

export interface ToggleAllCommand {
  readonly type: "toggle-all";
  readonly data: ToggleAllCommandData;
}

export type ToggleAllCommandData = Readonly<{
  readonly checked: boolean;
}>;

export function createToggleAll(data: ToggleAllCommandData): ToggleAllCommand {
  return {
    type: "toggle-all",
    data,
  };
}

export function toggleAll(
  _state: TodoState[],
  command: ToggleAllCommand,
): AllToggledEvent[] {
  const event = createAllToggled({
    checked: command.data.checked,
  });
  return [event];
}
