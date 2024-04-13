const express = require('express')
const app = express()
const PORT = 3000

app.get('/posts', (req, res) => {
  res.sendFile(__dirname + '/posts.html')
})

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// Serve static files from public directory
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
