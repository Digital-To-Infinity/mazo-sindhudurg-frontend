import { api } from './api'

interface LoginPayload { email: string; password: string }
interface AuthResponse { token: string; user: { id: number; email: string; role: string } }

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return api.post<AuthResponse>('/auth/login', payload)
}

export async function logout(): Promise<void> {
  return api.post('/auth/logout', {})
}
