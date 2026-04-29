import { ENV } from "@/config/env";

export function runAgentEnvs() {
  const apiKey = ENV.OPENROUTER_API_KEY;
  const modelName = ENV.MODEL_NAME;
  const baseURL = ENV.BASE_URL;
  const appURL = ENV.APP_URL;

  return {
    apiKey,
    modelName,
    baseURL,
    appURL,
  };
}
