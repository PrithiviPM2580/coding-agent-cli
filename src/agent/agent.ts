import { ENV } from "@/config/env";
import { ChatOpenAI } from "@langchain/openai";

export async function runAgent(input: string): Promise<string> {
  const apiKey = ENV.OPENROUTER_API_KEY;
  const modelName = ENV.MODEL_NAME;
  const baseURL = ENV.BASE_URL;
  const appURL = ENV.APP_URL;

  const llm = new ChatOpenAI({
    modelName: modelName,
    openAIApiKey: apiKey,
    temperature: 0.7,
    maxTokens: 4096,
    configuration: {
      baseURL: baseURL,
      defaultHeaders: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": appURL,
        "X-Title": "Coding Agent CLI",
      },
    },
  });

  try {
    const response = await llm.invoke([
      {
        role: "system",
        content:
          "You are a senior software engineer assistant. Prioritize safety and minimal code changes",
      },
      {
        role: "human",
        content: input,
      },
    ]);

    return response.content.toString();
  } catch (error) {
    console.error("Error running agent:", error);
    throw new Error("Failed to get response from the language model");
  }
}
