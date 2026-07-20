// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface AllToggledEvent {
  readonly type: "all-toggled";
  readonly data: AllToggledEventData;
}

export type AllToggledEventData = Readonly<{
  readonly checked: boolean;
}>;
