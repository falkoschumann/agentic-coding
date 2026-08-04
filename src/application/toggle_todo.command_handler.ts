// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import {
  toggleTodo,
  type ToggleTodoCommand,
} from "../domain/toggle_todo.command";
import type { TodoRepository } from "../infrastructure/todo.repository";
import type { EventBus } from "../shared/event_bus";
import { createCommandStatus, type CommandStatus } from "../shared/message";

export class ToggleTodoCommandHandler {
  static create({
    eventBus,
    todoRepository,
  }: {
    eventBus: EventBus;
    todoRepository: TodoRepository;
  }): ToggleTodoCommandHandler {
    return new ToggleTodoCommandHandler(eventBus, todoRepository);
  }

  #eventBus;
  #todoRepository;

  private constructor(eventBus: EventBus, todoRepository: TodoRepository) {
    this.#eventBus = eventBus;
    this.#todoRepository = todoRepository;
  }

  async handle(command: ToggleTodoCommand): Promise<CommandStatus> {
    let todos = await this.#todoRepository.load();
    const events = toggleTodo(todos, command);
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
