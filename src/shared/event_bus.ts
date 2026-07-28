// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export type Event<TData = unknown> = Readonly<{ type: string; data: TData }>;

export type EventHandler<TMessage extends Event = Event> = (
  message: TMessage,
) => void;

export class EventBus {
  readonly #cacheSize;
  readonly #log;

  #handlers: EventHandler<Event>[] = [];
  readonly #events: Event[] = [];

  constructor({
    cacheSize = 100,
    log,
  }: { cacheSize?: number; log?: Console } = {}) {
    this.#cacheSize = cacheSize;
    this.#log = log;
  }

  subscribe<TMessage extends Event>(handler: EventHandler<TMessage>) {
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
