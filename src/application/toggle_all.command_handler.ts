// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { toggleAll, type ToggleAllCommand } from "../domain/toggle_all.command";
import type { TodoRepository } from "../infrastructure/todo.repository";
import type { EventBus } from "../shared/event_bus";
import { createCommandStatus, type CommandStatus } from "../shared/message";

export class ToggleAllCommandHandler {
  static create({
    eventBus,
    todoRepository,
  }: {
    eventBus: EventBus;
    todoRepository: TodoRepository;
  }): ToggleAllCommandHandler {
    return new ToggleAllCommandHandler(eventBus, todoRepository);
  }

  #eventBus;
  #todoRepository;

  private constructor(eventBus: EventBus, todoRepository: TodoRepository) {
    this.#eventBus = eventBus;
    this.#todoRepository = todoRepository;
  }

  async handle(command: ToggleAllCommand): Promise<CommandStatus> {
    let todos = await this.#todoRepository.load();
    const events = toggleAll(todos, command);
    for (const event of events) {
      todos = todos.map((todo) => ({ ...todo, completed: event.data.checked }));
      await this.#todoRepository.store(todos);
      this.#eventBus.publish(event);
    }
    return createCommandStatus();
  }
}
