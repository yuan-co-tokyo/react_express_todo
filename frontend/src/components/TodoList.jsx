import TodoItem from './TodoItem';

// ToDo一覧を描画するコンポーネント
function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) {
    return (
      <p className="TodoList-empty" role="status" aria-live="polite">
        登録されたToDoはありません。
      </p>
    );
  }

  return (
    <ul className="TodoList" aria-live="polite">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TodoList;
