import { runAgent } from "@/agent/agent";

async function main() {
  try {
    console.log("Starting Coding Agent CLI...");
    const input = process.argv.slice(2).join(" ").trim();
    const result = await runAgent(input);
    console.log("Agent response:", result);
  } catch (error) {
    console.error("Error in main function:", error);
    process.exit(1);
  }
}

main();
