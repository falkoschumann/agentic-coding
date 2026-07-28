// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import { EventBus, type Event } from "../../src/shared/event_bus";

describe("Event bus", () => {
  it("should deliver published events to functional subscriber", () => {
    const bus = new EventBus();
    const events: (FooMessage | BarMessage)[] = [];
    const memorize = (event: FooMessage | BarMessage) => {
      events.push(event);
    };
    bus.subscribe(memorize);

    bus.publish(new FooMessage());
    bus.publish(new BarMessage());

    expect(events).toEqual([new FooMessage(), new BarMessage()]);
  });

  it("should ignore handler errors", () => {
    const bus = new EventBus();
    const events: Event[] = [];
    bus.subscribe(() => {
      throw new Error("foobar");
    });
    bus.subscribe((event) => events.push(event));

    bus.publish(new FooMessage());

    expect(events).toEqual([new FooMessage()]);
  });

  it("should unsubscribe", () => {
    const bus = new EventBus();
    const events: Event[] = [];
    const unsubscribe = bus.subscribe((event) => events.push(event));

    bus.publish(new FooMessage());
    unsubscribe();
    bus.publish(new BarMessage());

    expect(events).toEqual([new FooMessage()]);
  });

  it("should cache events", () => {
    const bus = new EventBus();

    bus.publish(new FooMessage());
    bus.publish(new BarMessage());

    expect(bus.getEvents()).toEqual([new FooMessage(), new BarMessage()]);
  });

  it("should discard old events when cache size is exceeded", () => {
    const bus = new EventBus({ cacheSize: 1 });

    bus.publish(new FooMessage());
    bus.publish(new BarMessage());

    expect(bus.getEvents()).toEqual([new BarMessage()]);
  });
});

class FooMessage {
  readonly type = "foo";
  readonly data;

  constructor({ value = 42 }: { value?: number } = {}) {
    this.data = { value };
  }
}

class BarMessage {
  readonly type = "bar";
  readonly data;

  constructor({ value = "lorem ipsum" }: { value?: string } = {}) {
    this.data = { value };
  }
}
