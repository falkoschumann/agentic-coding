// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export interface Log {
  log(...data: unknown[]): void;
  error(...data: unknown[]): void;
  warn(...data: unknown[]): void;
  info(...data: unknown[]): void;
  debug(...data: unknown[]): void;
  trace(...data: unknown[]): void;
}
