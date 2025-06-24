// utils/summarizeEvent.ts
import { summarizeEvent } from '@/lib/openai'


export async function summarizeEventWrapper(event: unknown) {
  const e = event as { summary?: string; description?: string; start: { dateTime: string } }
  const prompt = `Summarize this calendar event briefly:\nTitle: ${e.summary}\nDescription: ${e.description || 'N/A'}\nStart: ${e.start.dateTime}`
  const summary = await summarizeEvent(prompt)
  return summary
}
