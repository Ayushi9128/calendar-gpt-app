// pages/dashboard.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'

type Event = { summary: string; description?: string; start: { dateTime: string } }
type SummarizedEvent = { title: string; summary: string }

export default function Dashboard() {
  const [events, setEvents] = useState<SummarizedEvent[]>([])

  useEffect(() => {
    const fetchAndSummarize = async () => {
      const { data: calendarEvents } = await axios.get('/api/events') // Backend should handle auth/token
      const summaries = await Promise.all(calendarEvents.map(async (event: Event) => {
        const res = await axios.post('/api/summarize', { event })
        return { title: event.summary, summary: res.data.summary }
      }))
      setEvents(summaries)
    }

    fetchAndSummarize()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Calendar Summaries</h1>
      <ul className="space-y-4">
        {events.map((e, idx) => (
          <li key={idx} className="border p-4 rounded">
            <h2 className="font-semibold">{e.title}</h2>
            <p className="text-sm text-gray-700">{e.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
