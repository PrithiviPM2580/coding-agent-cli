import { z } from "zod";

export const readFileToolSchema = z.object({
  path: z.string().describe("Path to the file (relative to the project root)"),
});

export type ReadFileToolType = z.infer<typeof readFileToolSchema>;
