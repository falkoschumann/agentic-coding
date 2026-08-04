// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { describe, expect, it } from "vitest";

import { createCommandStatus } from "../../src/shared/message";

describe("Message", () => {
  it("should create success", async () => {
    const status = createCommandStatus();

    expect(status).toEqual({ success: true });
  });

  it("should create failure", async () => {
    const status = createCommandStatus("unknown error");

    expect(status).toEqual({ success: false, error: "unknown error" });
  });
});
