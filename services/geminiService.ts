
import { GoogleGenAI } from "@google/genai";
import { User, Message } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});.
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFriendResponse = async (friend: User, history: Message[]) => {
  // Using gemini-3-flash-preview for basic text conversation tasks.
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are ${friend.fullName} (username: @${friend.username}). 
    Your bio is: ${friend.bio}.
    You are chatting with your friend Alex Rivera (@creative_soul) on a social media app.
    Maintain your persona, keep replies relatively short and casual, like an Instagram DM.
    Use emojis naturally.
  `;

  const contents = history.map(msg => ({
    role: msg.isMe ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await ai.models.generateContent({
      model,
      contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'Hey!' }] }],
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    // Directly access the text property as per the latest SDK guidelines.
    return response.text || "Sorry, I missed that! What was that again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hey, I'm having some trouble connecting right now. Talk soon!";
  }
};
