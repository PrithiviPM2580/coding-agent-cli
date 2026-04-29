import { readFile } from "@/tools/file-system";
import type { Operation, SafetyContext } from "@/types/safety";
import path from "node:path";
import fs from "fs/promises";

const DEFAULT_CONTEXT: SafetyContext = {
  projectRoot: process.cwd(),
  allowedPaths: [process.cwd()],
  blockedPatterns: [/node_modules/, /\.git/, /dist/, /\.env/, /\.DS_Store/],
  requiresConfirmation: true,
};

export function isPathAllowed(
  filePath: string,
  context: SafetyContext,
): boolean {
  try {
    const resolvedPath = path.resolve(context.projectRoot, filePath);
    if (!resolvedPath.startsWith(context.projectRoot)) {
      return false;
    }

    const relativePath = path.relative(context.projectRoot, resolvedPath);

    if (
      relativePath &&
      context.blockedPatterns.some((pattern) => pattern.test(relativePath))
    ) {
      return false;
    }
    return context.allowedPaths.some((allowed) =>
      resolvedPath.startsWith(path.resolve(context.projectRoot, allowed)),
    );
  } catch (error) {
    return false;
  }
}

export async function fileExists(
  filePath: string,
): Promise<{ exists: boolean; path: string }> {
  try {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    await fs.access(resolvedPath);
    return { exists: true, path: resolvedPath };
  } catch (error) {
    return { exists: false, path: filePath };
  }
}

export async function validateFileOperation(
  operation: Operation,
  filePath: string,
  context: SafetyContext = DEFAULT_CONTEXT,
): Promise<{ safe: boolean; reason?: string }> {
  if (!isPathAllowed(filePath, context)) {
    return {
      safe: false,
      reason: `Operation "${operation}" on path "${filePath}" is not allowed due to safety restrictions.`,
    };
  }

  if (operation === "delete") {
    const existsResult = await fileExists(filePath);
    if (existsResult.exists) {
      return {
        safe: false,
        reason: `File "${filePath} doesnot exist and cannot be deleted.`,
      };
    }
  }

  const criticalFiles = [
    "package.json",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "tsconfig.json",
    "README.md",
    "AI_CODING_AGENT.md",
  ];

  if (criticalFiles.includes(path.basename(filePath))) {
    return {
      safe: false,
      reason: `File "${filePath}" is considered critical and cannot be deleted or modified.`,
    };
  }

  if (operation === "write") {
    const ext = path.extname(filePath).toLowerCase();
    const binaryExtensions = [
      ".exe",
      ".dll",
      ".so",
      ".dylib",
      ".bin",
      ".dat",
      ".img",
    ];
    if (binaryExtensions.includes(ext)) {
      return {
        safe: false,
        reason: `Writing to binary files like "${filePath}" is not allowed for safety reasons.`,
      };
    }
  }

  return { safe: true };
}

export async function safeReadFile(
  filePath: string,
): Promise<ReturnType<typeof readFile>> {
  const validation = validateFileOperation("read", filePath);

  if (!(await validation).safe) {
    return {
      success: false,
      path: filePath,
      error: `Safety violation: ${(await validation).reason}`,
    };
  }

  return readFile(filePath);
}
