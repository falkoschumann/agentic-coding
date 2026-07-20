// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export type TodoState = Readonly<{
  id: number;
  title: string;
  completed: boolean;
}>;
