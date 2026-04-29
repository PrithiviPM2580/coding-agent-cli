export interface FileReadResult {
  success: boolean;
  path: string;
  content?: string;
  error?: string;
}
