export type Operation = "read" | "write" | "delete";

export interface SafetyContext {
  projectRoot: string;
  allowedPaths: string[];
  blockedPatterns: RegExp[];
  requiresConfirmation: boolean;
}
