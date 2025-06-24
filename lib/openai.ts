// lib/openai.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure to set the correct OpenAI API Key in .env.local
});

export async function summarizeEvent(eventDescription: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Summarize this event: ${eventDescription}`,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error summarizing event:', error);
    throw new Error('Could not summarize event');
  }
}
