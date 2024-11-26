require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function isTrueAI(value) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a truth evaluator. Respond only with 'true' or 'false'."
        },
        {
          role: "user",
          content: `Is this statement true? "${value}"`
        }
      ],
      temperature: 0,
      max_tokens: 5
    });

    const result = completion.choices[0].message.content.toLowerCase().trim();
    return result === 'true';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

module.exports = isTrueAI;