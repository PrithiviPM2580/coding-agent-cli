export interface FileReadResult {
  success: boolean;
  path: string;
  content?: string;
  error?: string;
}

export interface FileWriteResult {
  success: boolean;
  path: string;
  error?: string;
}
