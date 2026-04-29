import { ENV } from "@/config/env";
import { runAgentEnvs } from "@/utils/helper";
import { ChatOpenAI } from "@langchain/openai";

export async function runAgent(input: string): Promise<string> {
  const { modelName, apiKey, baseURL, appURL } = runAgentEnvs();

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
