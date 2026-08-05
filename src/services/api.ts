const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function request<T>(path: string, options?: RequestInit & { params?: any }): Promise<T> {
  let url = `${BASE_URL}${path}`
  
  if (options?.params) {
    const searchParams = new URLSearchParams()
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      url += `?${queryString}`
    }
  }

  const fetchOptions = { ...options }
  delete fetchOptions.params

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...fetchOptions,
  })
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }
  
  return res.json()
}

export const api = {
  get: <T>(path: string, options?: { params?: any } & RequestInit) => 
    request<T>(path, options),
  post: <T>(path: string, body: unknown, options?: { params?: any } & RequestInit) => {
    const isFormData = body instanceof FormData;
    return request<T>(path, { 
      method: 'POST', 
      body: isFormData ? body : JSON.stringify(body), 
      ...(isFormData ? { headers: {} } : {}),
      ...options 
    });
  },
    
  put: <T>(path: string, body: unknown, options?: { params?: any } & RequestInit) => {
    const isFormData = body instanceof FormData;
    return request<T>(path, { 
      method: 'PUT', 
      body: isFormData ? body : JSON.stringify(body), 
      ...(isFormData ? { headers: {} } : {}),
      ...options 
    });
  },
  
  delete: <T>(path: string, options?: { params?: any } & RequestInit) => 
    request<T>(path, { method: 'DELETE', ...options }),
}
