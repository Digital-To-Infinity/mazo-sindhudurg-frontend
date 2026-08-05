import { api } from './api'

interface LoginPayload { email: string; password: string }
interface AuthUser { id: string; email: string; role: string }
interface AuthResponse { token: string; user: AuthUser }
interface ApiEnvelope<T> { success: boolean; message: string; data: T }

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const envelope = await api.post<ApiEnvelope<AuthResponse>>('/auth/login', payload)
  return envelope.data
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout', {})
}

export async function getMe(): Promise<AuthUser> {
  const envelope = await api.get<ApiEnvelope<AuthUser>>('/auth/me')
  return envelope.data
}
