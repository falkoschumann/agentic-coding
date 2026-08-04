// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { addTodo, type AddTodoCommand } from "../domain/add_todo.command";
import type { TodoRepository } from "../infrastructure/todo.repository";
import type { EventBus } from "../shared/event_bus";
import { createCommandStatus, type CommandStatus } from "../shared/message";

export class AddTodoCommandHandler {
  static create({
    eventBus,
    todoRepository,
  }: {
    eventBus: EventBus;
    todoRepository: TodoRepository;
  }): AddTodoCommandHandler {
    return new AddTodoCommandHandler(eventBus, todoRepository);
  }

  #eventBus;
  #todoRepository;

  private constructor(eventBus: EventBus, todoRepository: TodoRepository) {
    this.#eventBus = eventBus;
    this.#todoRepository = todoRepository;
  }

  async handle(command: AddTodoCommand): Promise<CommandStatus> {
    let todos = await this.#todoRepository.load();
    const events = addTodo(todos, command);
    for (const event of events) {
      todos = [...todos, event.data];
      await this.#todoRepository.store(todos);
      this.#eventBus.publish(event);
    }
    return createCommandStatus();
  }
}
