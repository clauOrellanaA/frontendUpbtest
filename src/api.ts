export interface Product { id: number; nombre: string; precio: number; stock: number; createdAt: string }
export type ProductInput = Pick<Product, 'nombre' | 'precio' | 'stock'>;
const base = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(`${base}/productos${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options?.headers }, signal: options?.signal ?? AbortSignal.timeout(15000) }); }
  catch (error) { if (error instanceof DOMException && error.name === 'AbortError') throw error; throw new Error('No se pudo conectar con el servidor. Comprueba que el backend esté iniciado y revisa VITE_API_URL.'); }
  if (!response.ok) { const body = await response.json().catch(() => null); throw new Error(body?.error || `Error del servidor (${response.status})`); }
  return response.status === 204 ? undefined as T : response.json();
}
export const api = {
  list: (signal?: AbortSignal) => request<Product[]>('', { signal }),
  search: (nombre: string, signal?: AbortSignal) => request<Product[]>(`/buscar?nombre=${encodeURIComponent(nombre)}`, { signal }),
  create: (data: ProductInput) => request<Product>('', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: ProductInput) => request<Product>(`/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: number) => request<void>(`/${id}`, { method: 'DELETE' }),
};
