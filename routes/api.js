// routes/api.js
import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { contacts } from '../data/contacts.js'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// API routes
// * posts
apiRouter.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, '../api/posts.html'))
})

// * contacts
apiRouter.get('/all-contacts', (req, res) => {
  const resultsHTML = contacts
    .map(
      (contact) => `
    <li>
      <strong>${contact.firstName} ${contact.lastName}</strong>
      <span>${contact.email}</span>
    </li>
  `
    )
    .join('')
  res.send(resultsHTML)
})

apiRouter.post('/search-contacts', (req, res) => {
  const query = req.body.search.toLowerCase()
  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    )
  })

  const resultsHTML = filteredContacts
    .map((contact) => {
      return `
      <li>
        <strong>${contact.firstName} ${contact.lastName}</strong>
        <span>${contact.email}</span>
      </li>
    `
    })
    .join('') // Join the array of strings into a single string

  res.send(resultsHTML)
})

export default apiRouter
