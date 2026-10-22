const BASE = import.meta.env.VITE_API_URL ?? '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);

  if (!res.ok) {
    let message = 'Algo deu errado. Tente novamente.';
    try {
      message = (await res.json()).message || message;
    } catch {
      /* resposta sem corpo JSON */
    }
    throw new Error(message);
  }

  return res.status === 204 ? null : res.json();
}

const withJson = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export function listTasks({ search = '', status = 'all' }, signal) {
  const params = new URLSearchParams({ search, status });
  return request(`/api/tasks?${params}`, { signal });
}

export const createTask = (data) => request('/api/tasks', withJson('POST', data));

export const updateTask = (id, data) =>
  request(`/api/tasks/${id}`, withJson('PATCH', data));

// Sem Content-Type: o Fastify rejeita DELETE com "application/json" e corpo vazio.
export const deleteTask = (id) => request(`/api/tasks/${id}`, { method: 'DELETE' });
