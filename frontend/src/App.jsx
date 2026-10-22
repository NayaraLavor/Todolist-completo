import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, listTasks, updateTask } from './api.js';
import { useDebounce } from './useDebounce.js';
import Scene from './components/Scene.jsx';
import TaskItem from './components/TaskItem.jsx';
import TaskModal from './components/TaskModal.jsx';
import { PlusIcon } from './components/Icons.jsx';

export default function App() {
  const [data, setData] = useState({ tasks: [], total: 0, completed: 0 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // { mode: 'create' | 'edit', task? }
  const [reloadKey, setReloadKey] = useState(0);

  // A busca só dispara quando o usuário para de digitar por 400 ms.
  const debouncedSearch = useDebounce(search, 400);
  const refresh = useCallback(() => setReloadKey((k) => k + 1), []);
  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    const controller = new AbortController();

    listTasks({ search: debouncedSearch.trim(), status }, controller.signal)
      .then((result) => {
        setData(result);
        setError('');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Não foi possível carregar as tarefas. Verifique se o servidor está rodando.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedSearch, status, reloadKey]);

  async function run(action) {
    try {
      await action();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      refresh(); // recarrega: mantém ordenação e contadores corretos
    }
  }

  function toggle(task) {
    const completed = !task.completed;
    // atualização otimista para o checkbox responder na hora
    setData((d) => ({
      ...d,
      completed: d.completed + (completed ? 1 : -1),
      tasks: d.tasks.map((t) => (t.id === task.id ? { ...t, completed } : t)),
    }));
    run(() => updateTask(task.id, { completed }));
  }

  function remove(task) {
    run(() => deleteTask(task.id));
  }

  async function save({ title, dueDate }) {
    if (modal.mode === 'edit') {
      await updateTask(modal.task.id, { title, dueDate });
    } else {
      await createTask({ title, dueDate });
    }
    closeModal();
    refresh();
  }

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <>
      <Scene />

      <main className="app">
        <header className="head">
          <h1 className="title">Lista de Tarefas</h1>
          <p className="counter" aria-live="polite">
            {data.completed} de {data.total} concluídas
          </p>
        </header>

        <div className="toolbar">
          <input
            type="search"
            className="glass-input"
            placeholder="Buscar tarefas"
            aria-label="Buscar tarefas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="round-btn"
            aria-label="Criar tarefa"
            onClick={() => setModal({ mode: 'create' })}
          >
            <PlusIcon size={22} />
          </button>
          <select
            className="glass-select"
            aria-label="Filtrar por status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>

        {error && (
          <p className="banner" role="alert">
            {error}
          </p>
        )}

        {!loading && data.tasks.length === 0 && !error ? (
          <p className="empty">
            {isSearching ? 'Nenhuma tarefa encontrada.' : 'Você não tem tarefas pendentes.'}
          </p>
        ) : (
          <ul className="list">
            {data.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggle}
                onEdit={(t) => setModal({ mode: 'edit', task: t })}
                onDelete={remove}
              />
            ))}
          </ul>
        )}
      </main>

      <button
        type="button"
        className="fab"
        aria-label="Criar tarefa"
        onClick={() => setModal({ mode: 'create' })}
      >
        <PlusIcon size={28} />
      </button>

      {modal && (
        <TaskModal
          key={modal.task?.id ?? 'new'}
          mode={modal.mode}
          task={modal.task}
          onClose={closeModal}
          onSubmit={save}
        />
      )}
    </>
  );
}
