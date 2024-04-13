import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
const PORT = 3000

// Simulate __dirname (in es6 __dirname is not available)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve static files from public directory
app.use(express.static('public'))

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }))

// * Pages
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/posts', (req, res) => {
  res.sendFile(__dirname + '/pages/posts.html')
})

app.get('/contacts', (req, res) => {
  res.sendFile(__dirname + '/pages/contacts.html')
})

// * API
app.get('/api/posts', (req, res) => {
  res.sendFile(__dirname + '/api/posts.html')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
