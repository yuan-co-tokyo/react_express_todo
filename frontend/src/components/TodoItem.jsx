// ToDo1件分の表示を行うコンポーネント
function TodoItem({ todo, onToggle, onDelete }) {
  const checkboxId = `todo-${todo.id}`;

  return (
    <li className="TodoItem">
      <div className="TodoItem-body">
        <input
          id={checkboxId}
          className="TodoItem-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
        />
        <label
          className={`TodoItem-label${todo.completed ? ' is-completed' : ''}`}
          htmlFor={checkboxId}
        >
          {todo.title}
        </label>
      </div>
      <button
        className="TodoItem-delete"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`「${todo.title}」を削除`}
      >
        削除
      </button>
    </li>
  );
}

export default TodoItem;
