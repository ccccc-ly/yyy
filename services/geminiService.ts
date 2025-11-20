import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToMuse = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are Muse, the AI assistant for Aura's design portfolio. You are sophisticated, artistic, and helpful. Keep answers concise.",
      }
    });
    
    return { text: response.text || "I'm speechless." };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "My creative energies are temporarily depleted. Please try again later." };
  }
};
