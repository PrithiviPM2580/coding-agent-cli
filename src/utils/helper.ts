import { ENV } from "@/config/env";
import { MODELS } from "@/lib/models";

export function runAgentEnvs() {
  const apiKey = ENV.OPENROUTER_API_KEY;
  const modelName = MODELS.AUTO_FREE_MODEL;
  const baseURL = ENV.OPENROUTER_BASE_URL;
  const appURL = ENV.APP_URL;

  return {
    apiKey,
    modelName,
    baseURL,
    appURL,
  };
}
