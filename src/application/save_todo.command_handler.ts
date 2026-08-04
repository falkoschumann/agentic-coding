// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { saveTodo, type SaveTodoCommand } from "../domain/save_todo.command";
import type { TodoRepository } from "../infrastructure/todo.repository";
import type { EventBus } from "../shared/event_bus";
import { createCommandStatus, type CommandStatus } from "../shared/message";

export class SaveTodoCommandHandler {
  static create({
    eventBus,
    todoRepository,
  }: {
    eventBus: EventBus;
    todoRepository: TodoRepository;
  }): SaveTodoCommandHandler {
    return new SaveTodoCommandHandler(eventBus, todoRepository);
  }

  #eventBus;
  #todoRepository;

  private constructor(eventBus: EventBus, todoRepository: TodoRepository) {
    this.#eventBus = eventBus;
    this.#todoRepository = todoRepository;
  }

  async handle(command: SaveTodoCommand): Promise<CommandStatus> {
    let todos = await this.#todoRepository.load();
    const events = saveTodo(todos, command);
    for (const event of events) {
      todos = todos.map((todo) =>
        todo.id === event.data.id ? { ...todo, ...event.data } : todo,
      );
      await this.#todoRepository.store(todos);
      this.#eventBus.publish(event);
    }
    return createCommandStatus();
  }
}
