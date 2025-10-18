import { useState } from 'react';

// ToDo追加フォームを提供するコンポーネント
function TodoForm({ onSubmit, disabled = false }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    // 送信イベントを処理
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    try {
      await onSubmit(trimmed);
      setTitle('');
    } catch {
      // エラー時は入力値を維持
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit} aria-label="ToDoを追加">
      <div className="TodoForm-fields">
        <label className="TodoForm-label" htmlFor="todo-title">
          ToDo内容
        </label>
        <input
          id="todo-title"
          className="TodoForm-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="例: 牛乳を買う"
          autoComplete="off"
          disabled={disabled}
          required
        />
      </div>
      <button className="TodoForm-submit" type="submit" disabled={disabled}>
        追加
      </button>
    </form>
  );
}

export default TodoForm;
