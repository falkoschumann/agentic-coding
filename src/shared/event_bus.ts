// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { Log } from "./log";

export type Event<TData = unknown> = Readonly<{ type: string; data: TData }>;

export type EventHandler<TEvent extends Event = Event> = (
  event: TEvent,
) => void;

export class EventBus {
  static create({
    cacheSize = 100,
    log,
  }: { cacheSize?: number; log?: Log } = {}) {
    return new EventBus(cacheSize, log);
  }

  readonly #cacheSize;
  readonly #log;

  #handlers: EventHandler<Event>[] = [];
  readonly #events: Event[] = [];

  private constructor(cacheSize: number, log?: Log) {
    this.#cacheSize = cacheSize;
    this.#log = log;
  }

  subscribe<TEvent extends Event>(handler: EventHandler<TEvent>) {
    this.#handlers = [...this.#handlers, handler as EventHandler<Event>];
    return () => {
      this.#handlers = this.#handlers.filter((h) => h !== handler);
    };
  }

  publish(event: Event) {
    this.#events.push(event);
    while (this.#events.length > this.#cacheSize) {
      this.#events.shift();
    }

    this.#handlers.forEach((handler) => {
      try {
        handler(event);
      } catch (error) {
        this.#log?.error("Error in event handler:", error);
      }
    });
  }

  getEvents() {
    return this.#events;
  }
}
