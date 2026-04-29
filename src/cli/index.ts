import { runAgent } from "@/agent/agent";

async function main() {
  try {
    const result = await runAgent("How are you");
    console.log("Agent response:", result);
  } catch (error) {
    console.error("Error in main function:", error);
    process.exit(1);
  }
}

main();
