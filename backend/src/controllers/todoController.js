// ToDoのユースケースをまとめたコントローラー
const todoService = require('../services/todoService')

const listTodos = (req, res) => {
  // 一覧取得
  const todos = todoService.getAll()
  res.json(todos)
}

const createTodo = (req, res) => {
  // 作成処理
  const { title, completed = false } = req.body || {}
  if (!title) {
    return res.status(400).json({ message: 'titleは必須です' })
  }
  const todo = todoService.create({ title, completed })
  res.status(201).json(todo)
}

const updateTodo = (req, res) => {
  // 更新処理
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'idが不正です' })
  }
  const { title, completed } = req.body || {}
  const payload = {}
  if (title !== undefined) {
    payload.title = title
  }
  if (completed !== undefined) {
    payload.completed = Boolean(completed)
  }
  if (Object.keys(payload).length === 0) {
    return res.status(400).json({ message: '更新内容がありません' })
  }
  const updated = todoService.update(id, payload)
  if (!updated) {
    return res.status(404).json({ message: '対象が見つかりません' })
  }
  res.json(updated)
}

const deleteTodo = (req, res) => {
  // 削除処理
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'idが不正です' })
  }
  const removed = todoService.remove(id)
  if (!removed) {
    return res.status(404).json({ message: '対象が見つかりません' })
  }
  res.status(204).send()
}

module.exports = {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo
}
