import { z } from "zod";

export const readFileToolSchema = z.object({
  path: z.string().describe("Path to the file (relative to the project root)"),
});

export const writeFileToolSchema = z.object({
  path: z.string().describe("Path to the file (relative to the project root)"),
  content: z.string().describe("Content to write to the file"),
});

export type ReadFileToolType = z.infer<typeof readFileToolSchema>;
export type WriteFileToolType = z.infer<typeof writeFileToolSchema>;
