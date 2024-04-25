// routes/pages.js
import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const pagesRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Routes for serving HTML pages
pagesRouter.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

pagesRouter.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/posts.html'))
})

pagesRouter.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/users.html'))
})

pagesRouter.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/contacts.html'))
})

pagesRouter.get('/temperature', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/temperature.html'))
})

pagesRouter.get('/polling', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/polling.html'))
})

pagesRouter.get('/weather', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/weather.html'))
})

pagesRouter.get('/validation', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/validation.html'))
})

export default pagesRouter
