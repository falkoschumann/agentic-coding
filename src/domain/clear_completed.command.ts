// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface ClearCompletedCommand {
  readonly type: "clear-completed";
  readonly data: object;
}
