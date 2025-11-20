import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
你是 'Aura'，一位世界级多学科设计师的数字替身。
你的个性精致、极简，带有一丝抽象艺术感，但对设计理论、色彩心理学和排版学有着深刻的理解。
你需要用中文与访客交流。
你的职责是：
1. 以清晰但充满艺术感的方式解释设计概念。
2. 为他们的项目生成创意提示或抽象想法。
3. 回答关于设计师风格（大胆、以用户为中心、高对比度）的问题。
保持回答简洁（大部分在 100 字以内）且优雅。尽量避免使用 markdown 符号（如 **加粗**），仅使用纯净的文本。
`;

export const getGeminiChat = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key missing");
    throw new Error("API Key is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToMuse = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const chat = getGeminiChat();
    const streamResult = await chat.sendMessageStream({ message });
    return streamResult;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw error;
  }
};