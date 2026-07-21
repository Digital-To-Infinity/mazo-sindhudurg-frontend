const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const isFormData = options?.body instanceof FormData;
  const headers = new Headers(options?.headers);
  
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  } else if (isFormData) {
    // Let browser set Content-Type with boundary for FormData
    headers.delete('Content-Type');
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  get: <T = any>(path: string, options?: { params?: Record<string, any> }) => {
    let url = path;
    if (options?.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) searchParams.append(key, String(value));
      });
      url += `?${searchParams.toString()}`;
    }
    return request<T>(url) as any;
  },
  post: <T>(path: string, body?: unknown, options?: RequestInit) => {
    const isFormData = body instanceof FormData;
    return request<T>(path, { method: 'POST', body: isFormData ? (body as FormData) : JSON.stringify(body), ...options })
  },
  put: <T>(path: string, body?: unknown, options?: RequestInit) => {
    const isFormData = body instanceof FormData;
    return request<T>(path, { method: 'PUT', body: isFormData ? (body as FormData) : JSON.stringify(body), ...options })
  },
  patch: <T>(path: string, body?: unknown, options?: RequestInit) => {
    const isFormData = body instanceof FormData;
    return request<T>(path, { method: 'PATCH', body: isFormData ? (body as FormData) : JSON.stringify(body), ...options })
  },
  delete: <T>(path: string, options?: RequestInit) => request<T>(path, { method: 'DELETE', ...options }),
}
