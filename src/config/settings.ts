import type { Settings } from "@/types";
import { ru } from "zod/locales";

const DEFAULT_SETTINGS: Settings = {
  version: "1.0.0",
  allowList: {
    files: [],
    commands: [],
  },
  prefrences: {
    confirmationMode: "manual",
    autoConfirmNonInteractive: true,
  },
};

export class SettingsManager {
  private settings: Settings;

  constructor(projectRoot?: string) {
    const root = projectRoot || process.cwd();
    this.settings = { ...DEFAULT_SETTINGS };
  }

  getSettings(): Settings {
    return this.settings;
  }

  isCommandAllowed(command: string): boolean {
    const rules = this.settings.allowList.commands;
    return rules.some((rule) => {
      if (!rule.command) return false;
      return command.startsWith(rule.command) || command.includes(rule.command);
    });
  }

  isFileAllowed(filePath: string, operation: "write" | "delete"): boolean {
    const rules = this.settings.allowList.files;
    return rules.some((rule) => {
      if (
        rule.path === filePath &&
        (rule.operation === operation || rule.operation === "write")
      ) {
        return true;
      }
      return false;
    });
  }
}
