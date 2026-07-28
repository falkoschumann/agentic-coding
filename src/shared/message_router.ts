// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export type Message<TData = unknown> = Readonly<{ type: string; data: TData }>;

export type MessageHandler<
  TMessage extends Message = Message,
  TResponse = unknown,
> = (message: TMessage) => TResponse;

export class MessageRouter {
  #routing = new Map<string, MessageHandler>();

  register(type: string, handler: MessageHandler) {
    this.#routing.set(type, handler);
  }

  async route<TResponse = unknown>(message: Message): Promise<TResponse> {
    const handler = this.#routing.get(message.type);
    if (handler == null) {
      throw new Error(
        `No handler registered for message type: ${message.type}`,
      );
    }

    return (await handler(message)) as TResponse;
  }
}
