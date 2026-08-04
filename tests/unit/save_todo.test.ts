// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { SaveTodoCommandHandler } from "../../src/application/save_todo.command_handler";
import { createTodo } from "../../src/domain/todo.aggregate";
import { createSaveTodo } from "../../src/domain/save_todo.command";
import { createTodoSaved } from "../../src/domain/todo_saved.event";
import { TodoRepository } from "../../src/infrastructure/todo.repository";
import { EventBus } from "../../src/shared/event_bus";
import { createCommandStatus } from "../../src/shared/message";

describe("Save todo", () => {
  beforeEach(() => {
    const repository = TodoRepository.create();
    repository.clear();
  });

  it("should save todo", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "foo",
        completed: false,
      }),
      createTodo({
        id: 2,
        title: "bar",
        completed: true,
      }),
    ]);

    const command = createSaveTodo({ id: 1, title: "lorem ipsum" });
    const status = await handler.handle(command);

    expect(status).toEqual(createCommandStatus());
    expect(eventBus.getEvents()).toEqual([
      createTodoSaved({ id: 1, title: "lorem ipsum" }),
    ]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "lorem ipsum", completed: false }),
      createTodo({ id: 2, title: "bar", completed: true }),
    ]);
  });

  it("should reject save with empty title", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "foo",
        completed: false,
      }),
    ]);

    const command = createSaveTodo({ id: 1, title: "" });
    const action = () => handler.handle(command);

    expect(action).rejects.toThrow("title-must-not-be-empty");
    expect(eventBus.getEvents()).toEqual([]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "foo", completed: false }),
    ]);
  });

  it("should reject save with whitespace title", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "foo",
        completed: false,
      }),
    ]);

    const command = createSaveTodo({ id: 1, title: "   " });
    const action = () => handler.handle(command);

    expect(action).rejects.toThrow("title-must-not-be-empty");
    expect(eventBus.getEvents()).toEqual([]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "foo", completed: false }),
    ]);
  });

  it("should reject save for unknown id", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "foo",
      }),
    ]);

    const command = createSaveTodo({ id: 2, title: "lorem ipsum" });
    const action = () => handler.handle(command);

    expect(action).rejects.toThrow("todo-must-exist");
    expect(eventBus.getEvents()).toEqual([]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "foo", completed: false }),
    ]);
  });
});

function configure() {
  const eventBus = EventBus.create();
  const todoRepository = TodoRepository.create();
  const handler = SaveTodoCommandHandler.create({ eventBus, todoRepository });
  return { handler, eventBus, todoRepository };
}
