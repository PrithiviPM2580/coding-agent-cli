import { z } from "zod";

const envConfig = {
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  OPENROUTER_BASE_URL: process.env.OPENROUTER_BASE_URL,
  APP_URL: process.env.APP_URL,
  MODEL_NAME: process.env.MODEL_NAME,
};

const envSchema = z.object({
  OPENROUTER_API_KEY: z.string().nonempty("OPENROUTER_API_KEY is required"),
  OPENROUTER_BASE_URL: z.string().nonempty("OPENROUTER_BASE_URL is required"),
  APP_URL: z.string().nonempty("APP_URL is required"),
  MODEL_NAME: z.string().nonempty("MODEL_NAME is required"),
});

function validateEnv(config: typeof envConfig) {
  const parse = envSchema.safeParse(config);
  if (!parse.success) {
    throw new Error(`Environment validation error: ${parse.error.message}`);
  }
  return parse.data;
}

export const ENV = validateEnv(envConfig);
