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

// * users - GET users from json placeholder API
apiRouter.get('/users', async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()

  res.send(
    `${users
      .map(
        (user) =>
          `<li style='margin-bottom: 0.25rem;'><span style='font-weight: bold;'>${user.name}</span> <span style='color: #6b7280;'>${user.email}</span></li>`
      )
      .join('')}`
  )
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
