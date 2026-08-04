// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export type CommandStatus<E = string> = Success | Failure<E>;

type Success = Readonly<{
  success: true;
}>;

type Failure<E = string> = Readonly<{
  success: false;
  error: E;
}>;

export function createCommandStatus<E = string>(error?: E): CommandStatus<E> {
  return error == null ? { success: true } : { success: false, error };
}
