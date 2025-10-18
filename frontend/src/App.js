import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { createTodo, deleteTodo, getTodos, updateTodo } from './services/todoApi';

// ToDoアプリ全体の状態を管理するコンポーネント
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 初期表示時に一覧を取得
    const fetchTodos = async () => {
      try {
        const initialTodos = await getTodos();
        setTodos(initialTodos);
      } catch (err) {
        setError(err.message || 'ToDoの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (title) => {
    // 新規ToDoを追加
    setIsSubmitting(true);
    setError('');
    try {
      const created = await createTodo({ title });
      setTodos((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message || 'ToDoの追加に失敗しました');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    // 完了状態を切り替え
    setError('');
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      setError(err.message || 'ToDoの更新に失敗しました');
    }
  };

  const handleDeleteTodo = async (id) => {
    // ToDoを削除
    setError('');
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message || 'ToDoの削除に失敗しました');
    }
  };

  return (
    <div className="App">
      <main className="App-container">
        <h1 className="App-title">ToDoリスト</h1>
        <TodoForm onSubmit={handleAddTodo} disabled={isSubmitting} />
        {error && (
          <div role="alert" aria-live="assertive" className="App-error">
            {error}
          </div>
        )}
        {loading ? (
          <p className="App-status" aria-live="polite">
            読み込み中...
          </p>
        ) : (
          <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
        )}
      </main>
    </div>
  );
}

export default App;
