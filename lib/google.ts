// lib/google.ts
import axios from 'axios'

const GOOGLE_API_BASE = 'https://www.googleapis.com/calendar/v3'

export async function fetchGoogleEvents(accessToken: string) {
  const res = await axios.get(`${GOOGLE_API_BASE}/calendars/primary/events`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { maxResults: 10, orderBy: 'startTime', singleEvents: true, timeMin: new Date().toISOString() }
  })
  return res.data.items
}
