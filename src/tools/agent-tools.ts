import {
  readFileToolSchema,
  writeFileToolSchema,
  type ReadFileToolType,
  type WriteFileToolType,
} from "@/validators/tools";
import { StructuredTool } from "@langchain/core/tools";
import { safeReadFile } from "@/safety";

export class ReadFileTool extends StructuredTool {
  // Define the name, description, and schema for the tool
  name = "read_file";
  description = "Reads the content of a file from the file system.";

  schema = readFileToolSchema;

  //Function to execute the tool
  async _call({ path }: ReadFileToolType): Promise<string> {
    const result = await safeReadFile(path);
    if (!result.success) {
      return `Error reading file: ${result.error}`;
    }
    return result.content || "";
  }
}

export class WriteFileTool extends StructuredTool {
  name: "write_file";
  description: "Writes content to a file in the file system.";

  schema: writeFileToolSchema;

  async _call({ path, content }: WriteFileToolType): Promise<string> {
    const result = await guardedWriteFile(path, content);
  }
}

export function getAgentTools(): StructuredTool[] {
  return [new ReadFileTool()];
}
