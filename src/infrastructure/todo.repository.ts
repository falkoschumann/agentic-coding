// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import type { TodoState } from "../domain/todo.aggregate";

const STORAGE_KEY = "todos";

export class TodoRepository {
  static create() {
    return new TodoRepository();
  }

  async store(todos: TodoState[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  async load(): Promise<TodoState[]> {
    const todosJson = localStorage.getItem(STORAGE_KEY);
    if (!todosJson) {
      return [];
    }

    return JSON.parse(todosJson) as TodoState[];
  }

  async clear(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }
}
