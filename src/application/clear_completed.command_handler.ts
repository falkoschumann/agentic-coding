// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import {
  clearCompleted,
  type ClearCompletedCommand,
} from "../domain/clear_completed.command";
import type { TodoRepository } from "../infrastructure/todo.repository";
import type { EventBus } from "../shared/event_bus";
import { createCommandStatus, type CommandStatus } from "../shared/message";

export class ClearCompletedCommandHandler {
  static create({
    eventBus,
    todoRepository,
  }: {
    eventBus: EventBus;
    todoRepository: TodoRepository;
  }): ClearCompletedCommandHandler {
    return new ClearCompletedCommandHandler(eventBus, todoRepository);
  }

  #eventBus;
  #todoRepository;

  private constructor(eventBus: EventBus, todoRepository: TodoRepository) {
    this.#eventBus = eventBus;
    this.#todoRepository = todoRepository;
  }

  async handle(command: ClearCompletedCommand): Promise<CommandStatus> {
    let todos = await this.#todoRepository.load();
    const events = clearCompleted(todos, command);
    for (const event of events) {
      todos = todos.filter((todo) => !event.data.ids.includes(todo.id));
      await this.#todoRepository.store(todos);
      this.#eventBus.publish(event);
    }
    return createCommandStatus();
  }
}
