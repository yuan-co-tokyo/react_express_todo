const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// 共通のレスポンス処理
const handleResponse = async (response) => {
  if (!response.ok) {
    try {
      const data = await response.json();
      throw new Error(data.message || 'リクエストに失敗しました');
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error('リクエストに失敗しました');
      }
      throw err;
    }
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

// ToDo一覧を取得
export const getTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'GET',
  });
  return handleResponse(response);
};

// ToDoを新規作成
export const createTodo = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

// ToDoを更新
export const updateTodo = async (id, payload) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

// ToDoを削除
export const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export default {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
