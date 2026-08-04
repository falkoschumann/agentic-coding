// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { AddTodoCommandHandler } from "../../src/application/add_todo.command_handler";
import { createTodo } from "../../src/domain/todo.aggregate";
import { createAddTodo } from "../../src/domain/add_todo.command";
import { createTodoAdded } from "../../src/domain/todo_added.event";
import { TodoRepository } from "../../src/infrastructure/todo.repository";
import { EventBus } from "../../src/shared/event_bus";
import { createCommandStatus } from "../../src/shared/message";

describe("Add todo", () => {
  beforeEach(() => {
    const repository = TodoRepository.create();
    repository.clear();
  });

  it("should add todo", async () => {
    const { handler, eventBus, todoRepository } = configure();

    const command = createAddTodo({ title: "foobar" });
    const status = await handler.handle(command);

    expect(status).toEqual(createCommandStatus());
    expect(eventBus.getEvents()).toEqual([
      createTodoAdded({ id: 1, title: "foobar", completed: false }),
    ]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "foobar", completed: false }),
    ]);
  });

  it("should auto increment todo ID", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([createTodo({ id: 1, title: "foo" })]);

    const command = createAddTodo({ title: "bar" });
    const status = await handler.handle(command);

    expect(status).toEqual(createCommandStatus());
    expect(eventBus.getEvents()).toEqual([
      createTodoAdded({ id: 2, title: "bar", completed: false }),
    ]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "foo" }),
      createTodo({ id: 2, title: "bar", completed: false }),
    ]);
  });

  it("should reject add todo with empty title", async () => {
    const { handler, eventBus, todoRepository } = configure();

    const command = createAddTodo({ title: "" });
    const action = () => handler.handle(command);

    expect(action).rejects.toThrow("title-must-not-be-empty");
    expect(eventBus.getEvents()).toEqual([]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([]);
  });

  it("should reject add todo with whitespace title", async () => {
    const { handler, eventBus, todoRepository } = configure();

    const command = createAddTodo({ title: "   " });
    const action = () => handler.handle(command);

    expect(action).rejects.toThrow("title-must-not-be-empty");
    expect(eventBus.getEvents()).toEqual([]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([]);
  });
});

function configure() {
  const eventBus = EventBus.create();
  const todoRepository = TodoRepository.create();
  const handler = AddTodoCommandHandler.create({ eventBus, todoRepository });
  return { handler, eventBus, todoRepository };
}
