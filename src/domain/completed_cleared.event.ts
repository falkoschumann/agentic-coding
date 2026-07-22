// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface CompletedClearedEvent {
  readonly type: "clear-completed";
  readonly data: CompletedClearedEventData;
}

export type CompletedClearedEventData = Readonly<{
  readonly ids: number[];
}>;

export function createCompletedCleared(
  data: CompletedClearedEventData,
): CompletedClearedEvent {
  return {
    type: "clear-completed",
    data,
  };
}
