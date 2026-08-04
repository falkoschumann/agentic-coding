// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { DestroyTodoCommandHandler } from "../../src/application/destroy_todo.command_handler";
import { createTodo } from "../../src/domain/todo.aggregate";
import { createDestroyTodo } from "../../src/domain/destroy_todo.command";
import { createTodoDestroyed } from "../../src/domain/todo_destroyed.event";
import { TodoRepository } from "../../src/infrastructure/todo.repository";
import { EventBus } from "../../src/shared/event_bus";
import { createCommandStatus } from "../../src/shared/message";

describe("Destroy todo", () => {
  beforeEach(() => {
    const repository = TodoRepository.create();
    repository.clear();
  });

  it("should destroy todo", async () => {
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

    const command = createDestroyTodo({ id: 2 });
    const status = await handler.handle(command);

    expect(status).toEqual(createCommandStatus());
    expect(eventBus.getEvents()).toEqual([createTodoDestroyed({ id: 2 })]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([createTodo({ id: 1, title: "foo" })]);
  });

  it("should reject destroy for unknown id", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "foo",
      }),
    ]);

    const command = createDestroyTodo({ id: 2 });
    const action = async () => handler.handle(command);

    await expect(action).rejects.toThrow("todo-must-exist");
    expect(eventBus.getEvents()).toEqual([]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([createTodo({ id: 1, title: "foo" })]);
  });
});

function configure() {
  const eventBus = EventBus.create();
  const todoRepository = TodoRepository.create();
  const handler = DestroyTodoCommandHandler.create({
    eventBus,
    todoRepository,
  });
  return { handler, eventBus, todoRepository };
}
