// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { ToggleAllCommandHandler } from "../../src/application/toggle_all.command_handler";
import { createTodo } from "../../src/domain/todo.aggregate";
import { createToggleAll } from "../../src/domain/toggle_all.command";
import { createAllToggled } from "../../src/domain/all_toggled.event";
import { TodoRepository } from "../../src/infrastructure/todo.repository";
import { EventBus } from "../../src/shared/event_bus";
import { createCommandStatus } from "../../src/shared/message";

describe("Toggle all", () => {
  beforeEach(() => {
    const repository = TodoRepository.create();
    repository.clear();
  });

  it("should toggle all", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "foo",
      }),
      createTodo({
        id: 2,
        title: "bar",
        completed: true,
      }),
    ]);

    const command = createToggleAll({ checked: true });
    const status = await handler.handle(command);

    expect(status).toEqual(createCommandStatus());
    expect(eventBus.getEvents()).toEqual([createAllToggled({ checked: true })]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "foo", completed: true }),
      createTodo({ id: 2, title: "bar", completed: true }),
    ]);
  });
});

function configure() {
  const eventBus = EventBus.create();
  const todoRepository = TodoRepository.create();
  const handler = ToggleAllCommandHandler.create({ eventBus, todoRepository });
  return { handler, eventBus, todoRepository };
}
