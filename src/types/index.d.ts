export interface AllowListRule {
  path?: string;
  command?: string;
  operation?: "read" | "write" | "execute" | "delete";
  addedAt: number;
}

export interface Settings {
  version: string;
  allowList: {
    files: AllowListRule[];
    commands: AllowListRule[];
  };
  prefrences: {
    confirmationMode: "manual" | "auto";
    autoConfirmNonInteractive: boolean;
  };
}
