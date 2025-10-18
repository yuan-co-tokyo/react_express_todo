import { createTodo, deleteTodo, getTodos, updateTodo } from '../services/todoApi';

describe('todoApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('GET /todos を呼び出して結果を返す', async () => {
    const mockTodos = [{ id: 1, title: 'テスト', completed: false }];
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockTodos),
    });

    const result = await getTodos();

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/todos',
      expect.objectContaining({ method: 'GET' }),
    );
    expect(result).toEqual(mockTodos);
  });

  it('POST /todos のエラーレスポンスを検知する', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ message: 'titleは必須です' }),
    });

    await expect(createTodo({ title: '' })).rejects.toThrow('titleは必須です');
  });

  it('PUT /todos/:id を呼び出す', async () => {
    const updated = { id: 1, title: '更新', completed: true };
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(updated),
    });

    const result = await updateTodo(1, { completed: true });

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/todos/1',
      expect.objectContaining({
        method: 'PUT',
      }),
    );
    expect(result).toEqual(updated);
  });

  it('DELETE /todos/:id で204の場合に null を返す', async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 204,
      json: jest.fn(),
    });

    const result = await deleteTodo(1);

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/todos/1',
      expect.objectContaining({ method: 'DELETE' }),
    );
    expect(result).toBeNull();
  });
});
