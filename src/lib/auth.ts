import { cookies } from 'next/headers'

interface Session {
  userId: string
  email: string
  role: string
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  if (!token) return null

  try {
    // Verify token via backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/me`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    if (!res.ok) return null
    const envelope = await res.json()
    return envelope?.data ?? null
  } catch {
    return null
  }
}
