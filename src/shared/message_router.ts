// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

export type Message<TData = unknown> = Readonly<{ type: string; data: TData }>;

export type MessageHandlerFunction<
  TMessage extends Message = Message,
  TResponse = unknown,
> = (message: TMessage) => TResponse;

export type MessageHandlerObject<
  TMessage extends Message = Message,
  TResponse = unknown,
> = {
  handle(message: TMessage): TResponse;
};

export type MessageHandler<
  TMessage extends Message = Message,
  TResponse = unknown,
> =
  | MessageHandlerFunction<TMessage, TResponse>
  | MessageHandlerObject<TMessage, TResponse>;

export class MessageRouter {
  static create() {
    return new MessageRouter();
  }

  private constructor() {}

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

    if (typeof handler === "function") {
      return (await handler(message)) as TResponse;
    } else {
      return (await handler.handle(message)) as TResponse;
    }
  }
}
