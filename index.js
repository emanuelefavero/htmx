const express = require('express')
const app = express()
const PORT = 3000

// Serve static files from public directory
app.use(express.static('public'))

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }))

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/posts', (req, res) => {
  res.sendFile(__dirname + '/views/posts.html')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
