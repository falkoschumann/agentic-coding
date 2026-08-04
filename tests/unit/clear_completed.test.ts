// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { ClearCompletedCommandHandler } from "../../src/application/clear_completed.command_handler";
import { createTodo } from "../../src/domain/todo.aggregate";
import { createClearCompleted } from "../../src/domain/clear_completed.command";
import { createCompletedCleared } from "../../src/domain/completed_cleared.event";
import { TodoRepository } from "../../src/infrastructure/todo.repository";
import { EventBus } from "../../src/shared/event_bus";
import { createCommandStatus } from "../../src/shared/message";

describe("Clear completed", () => {
  beforeEach(() => {
    const repository = TodoRepository.create();
    repository.clear();
  });

  it("should clear completed", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({ id: 1, title: "foo" }),
      createTodo({ id: 2, title: "bar", completed: true }),
    ]);

    const command = createClearCompleted();
    const status = await handler.handle(command);

    expect(status).toEqual(createCommandStatus());
    expect(eventBus.getEvents()).toEqual([
      createCompletedCleared({ ids: [2] }),
    ]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([createTodo({ id: 1, title: "foo" })]);
  });
});

function configure() {
  const eventBus = EventBus.create();
  const todoRepository = TodoRepository.create();
  const handler = ClearCompletedCommandHandler.create({
    eventBus,
    todoRepository,
  });
  return { handler, eventBus, todoRepository };
}
