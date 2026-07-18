// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: [
        "src/**/application/**/*",
        "src/**/domain/**/*",
        "src/**/infrastructure/**/*",
        // exclude layers UI and root
      ],
      provider: "istanbul",
      reporter: ["text", "html", "cobertura", "json"],
      thresholds: {
        statements: 85,
        branches: 85,
      },
    },
    exclude: ["**/node_modules/**", "**/dist/**", "**/test/e2e/**"],
    outputFile: "coverage/junit.xml",
    reporters: ["junit", "tree"],
    passWithNoTests: true,
  },
});
