import OpenAI from "openai";

interface IsTrueAIOptions {
  apiKey: string;
}

let openaiInstance: OpenAI | null = null;

function initializeOpenAI(options: IsTrueAIOptions) {
  openaiInstance = new OpenAI({
    apiKey: options.apiKey,
  });
}

async function isTrueAI(value: string): Promise<boolean> {
  if (!openaiInstance) {
    throw new Error("OpenAI is not initialized. Call initializeOpenAI first.");
  }

  try {
    const completion = await openaiInstance.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a truth evaluator. Respond only with 'true' or 'false'. Entry value is coming from JavaScript.",
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
}

export { isTrueAI, initializeOpenAI };
