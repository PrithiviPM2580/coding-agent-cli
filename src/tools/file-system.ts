import type { FileReadResult } from "@/types/tools";
import path from "node:path";
import * as fs from "fs/promises";

export async function readFile(filePath: string): Promise<FileReadResult> {
  try {
    const root = process.cwd();
    const resolvedPath = path.resolve(root, filePath);

    const relativePath = path.relative(root, resolvedPath);

    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      return {
        success: false,
        path: filePath,
        error: "Access denied: Path is outside the project root.",
      };
    }

    const content = await fs.readFile(resolvedPath, "utf-8");

    return {
      success: true,
      path: filePath,
      content,
    };
  } catch (error) {
    return {
      success: false,
      error: `Error reading file: ${
        error instanceof Error ? error.message : String(error)
      }`,
      path: filePath,
    };
  }
}
