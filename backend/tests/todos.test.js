// ToDoエンドポイントのCRUDテスト
const request = require('supertest')
const app = require('../src/app')
const todoService = require('../src/services/todoService')

describe('Todos API', () => {
  beforeEach(() => {
    // 各テスト前に状態を初期化
    todoService.reset()
  })

  test('GET /todos で空配列を返す', async () => {
    const response = await request(app).get('/todos')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('POST /todos で新規ToDoを作成する', async () => {
    const payload = { title: '新しいタスク' }
    const response = await request(app).post('/todos').send(payload)
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({ title: payload.title, completed: false })
  })

  test('PUT /todos/:id でToDoを更新する', async () => {
    const created = await request(app).post('/todos').send({ title: '更新対象' })
    const id = created.body.id

    const response = await request(app)
      .put(`/todos/${id}`)
      .send({ completed: true })

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({ id, completed: true })
  })

  test('DELETE /todos/:id でToDoを削除する', async () => {
    const created = await request(app).post('/todos').send({ title: '削除対象' })
    const id = created.body.id

    const response = await request(app).delete(`/todos/${id}`)

    expect(response.status).toBe(204)

    const listResponse = await request(app).get('/todos')
    expect(listResponse.body).toHaveLength(0)
  })

  test('POST /todos でtitleが無いと400を返す', async () => {
    const response = await request(app).post('/todos').send({})
    expect(response.status).toBe(400)
  })
})
