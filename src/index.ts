import OpenAI from "openai";
import { GoogleGenAI } from '@google/genai';

interface IsTrueAIOptions {
  apiKey: string;
}

let openaiInstance: OpenAI | null = null;
let geminiInstance: GoogleGenAI | null = null;

function initializeOpenAI(options: IsTrueAIOptions) {
  openaiInstance = new OpenAI({
    apiKey: options.apiKey,
  });
}

function initializeGemini(options: IsTrueAIOptions) {
  geminiInstance = new GoogleGenAI({apiKey: options.apiKey});
}

async function isTrueAI(value: string, apiType: 'openai' | 'gemini' = 'openai'): Promise<boolean> {
  if (apiType === 'openai') {
    if (!openaiInstance) {
      throw new Error("OpenAI is not initialized. Call initializeOpenAI first.");
    }

    try {
      const completion = await openaiInstance.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a truth evaluator. Respond only with 'true' or 'false'. Entry value is coming from JavaScript.",
          },
          {
            role: "user",
            content: `Is this statement true? "${value}"`,
          },
        ],
        temperature: 0,
        max_tokens: 5,
      });

      const result = completion.choices[0].message.content?.toLowerCase().trim();
      return result === "true";
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      throw error;
    }
  } else if (apiType === 'gemini') {
    if (!geminiInstance) {
      throw new Error("Gemini API is not initialized. Call initializeGemini first.");
    }

    try {
      const response = await geminiInstance.models.generateContent({
        model: 'gemini-2.0-flash-001', // Using the recommended flash model
        contents: `You are a truth evaluator. Respond only with 'true' or 'false'. Is this statement true? "${value}"`,
      });

      const result = response && response.text ? response.text.toLowerCase().trim() : 'ERROR';
      return result === "true";
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  } else {
    throw new Error("Invalid API type specified. Use 'openai' or 'gemini'.");
  }
}

export { isTrueAI, initializeOpenAI, initializeGemini };
