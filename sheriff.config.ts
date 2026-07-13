// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import { sameTag, type SheriffConfig } from "@softarc/sheriff-core";

export const config: SheriffConfig = {
  autoTagging: false,
  enableBarrelLess: true,
  barrelFileName: "mod.ts",
  entryFile: "src/main.tsx",
  modules: {
    src: ["layer:entry"],
    "src/application": ["layer:application"],
    "src/domain": ["layer:domain"],
    "src/domain/read_models": ["domain:read_model"],
    "src/domain/value_objects": ["domain:value_object"],
    "src/domain/services": ["domain:service"],
    "src/domain/<aggregate>": ["domain:aggregate"],
    "src/infrastructure": ["layer:infrastructure"],
    "src/ui": ["layer:ui", "ui:entry"],
    "src/ui/components": ["layer:ui", "ui:component"],
    "src/ui/layouts": ["layer:ui", "ui:layout"],
    "src/ui/pages": ["layer:ui", "ui:page"],
  },
  depRules: {
    "layer:entry": ["layer:*"],
    "layer:application": ["layer:infrastructure"],
    "layer:*": [sameTag, "layer:domain", "domain:*"],
    "domain:read_model": ["domain:aggregate", "domain:service"],
    "domain:service": ["domain:aggregate"],
    "domain:*": [sameTag, "domain:value_object"],
    "ui:entry": ["ui:*"],
    "ui:page": ["ui:layout"],
    "ui:*": [sameTag, "ui:component", "layer:domain", "domain:*"],
  },
};
