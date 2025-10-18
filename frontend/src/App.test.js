import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { createTodo, deleteTodo, getTodos, updateTodo } from './services/todoApi';

jest.mock('./services/todoApi');

describe('App', () => {
  beforeEach(() => {
    getTodos.mockResolvedValue([
      { id: 1, title: 'サンプルタスク', completed: false },
      { id: 2, title: '完了済みタスク', completed: true },
    ]);
    createTodo.mockImplementation(async ({ title }) => ({ id: 3, title, completed: false }));
    updateTodo.mockImplementation(async (id, payload) => ({ id, title: 'サンプルタスク', ...payload }));
    deleteTodo.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('一覧表示と各操作が機能する', async () => {
    render(<App />);

    expect(await screen.findByText('サンプルタスク')).toBeInTheDocument();
    expect(screen.getByText('完了済みタスク')).toBeInTheDocument();

    const user = userEvent.setup();

    await user.type(screen.getByLabelText('ToDo内容'), '新しいタスク');
    await user.click(screen.getByRole('button', { name: '追加' }));

    await waitFor(() => {
      expect(createTodo).toHaveBeenCalledWith({ title: '新しいタスク' });
    });
    expect(screen.getByText('新しいタスク')).toBeInTheDocument();

    const checkbox = screen.getByLabelText('サンプルタスク');
    await user.click(checkbox);

    await waitFor(() => {
      expect(updateTodo).toHaveBeenCalledWith(1, { completed: true });
    });

    const deleteButton = screen.getByRole('button', { name: '「完了済みタスク」を削除' });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(2);
    });
  });
});
