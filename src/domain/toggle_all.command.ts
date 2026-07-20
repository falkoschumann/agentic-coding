// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface ToggleAllCommand {
  readonly type: "add-todo";
  readonly data: ToggleAllCommandData;
}

export type ToggleAllCommandData = Readonly<{
  readonly checked: boolean;
}>;
