// pages/index.tsx
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const signIn = () => supabase.auth.signInWithOAuth({ provider: 'google' })

  const connectCalendar = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      access_type: 'offline',
      prompt: 'consent',
    })
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Welcome</h1>
      <button onClick={signIn} className="mr-4 bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <button onClick={connectCalendar} className="bg-green-500 text-white px-4 py-2 rounded">Connect Google Calendar</button>
    </div>
  )
}
