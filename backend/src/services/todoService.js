// メモリ上のToDoデータを扱うサービス
let todos = []
let nextId = 1

const getAll = () => {
  // 全件取得
  return todos
}

const create = (data) => {
  // 新規作成
  const todo = { id: nextId++, title: data.title, completed: Boolean(data.completed) }
  todos.push(todo)
  return todo
}

const update = (id, data) => {
  // 更新処理
  const index = todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    return null
  }
  todos[index] = { ...todos[index], ...data }
  return todos[index]
}

const remove = (id) => {
  // 削除処理
  const index = todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    return false
  }
  todos.splice(index, 1)
  return true
}

const reset = () => {
  // テスト用に初期化
  todos = []
  nextId = 1
}

module.exports = {
  getAll,
  create,
  update,
  remove,
  reset
}
