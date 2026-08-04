// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { beforeEach, describe, expect, it } from "vitest";

import { ToggleTodoCommandHandler } from "../../src/application/toggle_todo.command_handler";
import { createTodo } from "../../src/domain/todo.aggregate";
import { createToggleTodo } from "../../src/domain/toggle_todo.command";
import { createTodoToggled } from "../../src/domain/todo_toggled.event";
import { TodoRepository } from "../../src/infrastructure/todo.repository";
import { EventBus } from "../../src/shared/event_bus";
import { createCommandStatus } from "../../src/shared/message";

describe("Toggle todo", () => {
  beforeEach(() => {
    const repository = TodoRepository.create();
    repository.clear();
  });

  it("should toggle todo", async () => {
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

    const command = createToggleTodo({ id: 1 });
    const status = await handler.handle(command);

    expect(status).toEqual(createCommandStatus());
    expect(eventBus.getEvents()).toEqual([
      createTodoToggled({ id: 1, completed: true }),
    ]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([
      createTodo({ id: 1, title: "foo", completed: true }),
      createTodo({ id: 2, title: "bar", completed: true }),
    ]);
  });

  it("should reject toggle for unknown id", async () => {
    const { handler, eventBus, todoRepository } = configure();
    await todoRepository.store([
      createTodo({
        id: 1,
        title: "foo",
      }),
    ]);

    const command = createToggleTodo({ id: 2 });
    const action = () => handler.handle(command);

    expect(action).rejects.toThrow("todo-must-exist");
    expect(eventBus.getEvents()).toEqual([]);
    const todos = await todoRepository.load();
    expect(todos).toEqual([createTodo({ id: 1, title: "foo" })]);
  });
});

function configure() {
  const eventBus = EventBus.create();
  const todoRepository = TodoRepository.create();
  const handler = ToggleTodoCommandHandler.create({ eventBus, todoRepository });
  return { handler, eventBus, todoRepository };
}
