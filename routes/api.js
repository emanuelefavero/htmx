// routes/api.js
import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// API route for posts
apiRouter.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, '../api/posts.html'))
})

export default apiRouter
