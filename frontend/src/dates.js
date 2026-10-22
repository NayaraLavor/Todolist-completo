// O backend devolve due_date como 'YYYY-MM-DD' (dateStrings: true),
// então a comparação de strings ISO é segura e evita bugs de fuso horário.
export function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isOverdue(task) {
  return Boolean(task.due_date) && !task.completed && task.due_date < todayISO();
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
