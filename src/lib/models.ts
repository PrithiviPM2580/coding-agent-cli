export const MODELS = {
  // Strong general / reasoning
  STRONG_GENERAL_REASONING: "meta-llama/llama-3.3-70b-instruct:free",
  ULTRA_STRONG_REASONING: "nousresearch/hermes-3-llama-3.1-405b:free",
  HEAVY_GENERAL_REASONING: "nvidia/nemotron-3-super-120b-a12b:free",
  OPENAI_STRONG_GENERAL: "openai/gpt-oss-120b:free",
  OPENAI_FAST_GENERAL: "openai/gpt-oss-20b:free",
  QWEN_STRONG_REASONING: "qwen/qwen3-next-80b-a3b-instruct:free",

  // Writing / balanced chat
  GOOGLE_BALANCED_WRITING_31B: "google/gemma-4-31b-it:free",
  GOOGLE_BALANCED_WRITING_26B: "google/gemma-4-26b-a4b-it:free",
  GEMMA_GENERAL_CHAT_27B: "google/gemma-3-27b-it:free",
  GEMMA_GENERAL_CHAT_12B: "google/gemma-3-12b-it:free",

  // Coding
  CODING_EXPERT_QWEN: "qwen/qwen3-coder:free",
  CODING_REASONING_DOLPHIN:
    "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",

  // Fast lightweight models
  FAST_LIGHT_NEMOTRON_9B: "nvidia/nemotron-nano-9b-v2:free",
  FAST_LIGHT_NEMOTRON_12B_MULTIMODAL: "nvidia/nemotron-nano-12b-v2-vl:free",
  FAST_LIGHT_NEMOTRON_30B: "nvidia/nemotron-3-nano-30b-a3b:free",
  FAST_LIGHT_GEMMA_4B: "google/gemma-3-4b-it:free",
  FAST_LIGHT_LLAMA_3B: "meta-llama/llama-3.2-3b-instruct:free",

  // Flash / quick chat
  FLASH_CHAT_LING: "inclusionai/ling-2.6-flash:free",
  FLASH_CHAT_GLM: "z-ai/glm-4.5-air:free",
  FLASH_CHAT_MINIMAX: "minimax/minimax-m2.5:free",
  FLASH_CHAT_TENCENT: "tencent/hy3-preview:free",

  // Small reasoning models
  MICRO_REASONING_LFM: "liquid/lfm-2.5-1.2b-thinking:free",
  MICRO_INSTRUCT_LFM: "liquid/lfm-2.5-1.2b-instruct:free",
  SMALL_REASONING_GEMMA_3N: "google/gemma-3n-e4b-it:free",

  // OCR / tools
  OCR_FAST_BAIDU: "baidu/qianfan-ocr-fast:free",

  // Router fallback (auto model selection)
  AUTO_FREE_MODEL: "openrouter/free",
};

export type ModelKey = keyof typeof MODELS;
