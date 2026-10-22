import { useEffect, useRef, useState } from 'react';
import { CloseIcon } from './Icons.jsx';

export default function TaskModal({ mode, task, onClose, onSubmit }) {
  const isEdit = mode === 'edit';
  const [title, setTitle] = useState(task?.title ?? '');
  const [dueDate, setDueDate] = useState(task?.due_date ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('O nome da tarefa é obrigatório.');
      inputRef.current?.focus();
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSubmit({ title: trimmed, dueDate: dueDate || null });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onSubmit={handleSubmit}
        noValidate
      >
        <header className="modal__head">
          <h2 id="modal-title">{isEdit ? 'Editar Tarefa' : 'Criar Tarefa'}</h2>
          <button type="button" className="icon-btn" aria-label="Fechar" onClick={onClose}>
            <CloseIcon />
          </button>
        </header>

        <label className="field">
          <span>Nome da tarefa</span>
          <input
            ref={inputRef}
            type="text"
            maxLength={255}
            placeholder="O que precisa ser feito?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(error) && !title.trim()}
          />
        </label>

        <label className="field">
          <span>Data limite (opcional)</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <footer className="modal__foot">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Criar tarefa'}
          </button>
        </footer>
      </form>
    </div>
  );
}
