// Expressアプリケーションの初期化
const express = require('express')
const todosRouter = require('./routes/todos')

const app = express()

app.use(express.json())
app.use('/todos', todosRouter)

app.get('/health', (req, res) => {
  // 健康チェックエンドポイント
  res.json({ status: 'ok' })
})

module.exports = app
