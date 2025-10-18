// HTTPサーバーの起動ロジック
const app = require('./app')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  // 起動完了をログ出力
  console.log(`Server is running on port ${PORT}`)
})
