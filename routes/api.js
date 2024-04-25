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
  // Get values from request with hx-vals @see users.html
  const limit = req.query.limit || 10

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  )
  const users = await response.json()

  // Simulate a slow network connection
  setTimeout(() => {
    // Send the response
    res.send(
      `${users
        .map(
          (user) =>
            `<li style='margin-bottom: 0.25rem;'><span style='font-weight: bold;'>${user.name}</span> <span style='color: #6b7280;'>${user.email}</span></li>`
        )
        .join('')}`
    )
  }, 1000)
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

  // ? Uncomment the following line if you want to return a message when no results are found (instead of returning all contacts)
  // if (!query) {
  //   return res.send('No results found. Please enter a valid search query.')
  // }

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

// * temperature - POST temperature data
apiRouter.post('/temperature', (req, res) => {
  const fahrenheit = parseFloat(req.body.fahrenheit)
  const celsius = (fahrenheit - 32) * (5 / 9)

  res.send(`${fahrenheit}°F is ${Math.round(celsius)}°C`)
})

// * polling - GET updated data
let counter = 0
apiRouter.get('/polling', (req, res) => {
  counter++
  res.send(
    `<code style='color: #10b981; font-weight: bold; font-size: 2rem;'>${counter}</code>`
  )
})

// * weather - POST city and get weather data
apiRouter.post('/weather', async (req, res) => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY
  const base = 'https://api.openweathermap.org/data/2.5/'
  const { city } = req.body

  const response = await fetch(
    `${base}weather?q=${city}&units=metric&APPID=${apiKey}`
  )
  const weatherData = await response.json()

  res.send(
    `It's ${Math.round(weatherData.main.temp)}°C in ${weatherData.name}, ${
      weatherData.sys.country
    }`
  )
})

// * validation - handle POST email validation
apiRouter.post('/validate/email', (req, res) => {
  const { email } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailRegex.test(email)

  if (isValidEmail) {
    res.send(`
    <div hx-target="this" hx-swap="outerHTML">
      <label for="email">Email:</label>
      <input
        hx-post="/api/validate/email"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
        style="margin-bottom: 0.5rem"
        value="${email}"
      />

      <div style="margin-top: 0.5rem; color: green;">Email is valid</div>
    </div>
    `)
  } else {
    res.send(`
    <div hx-target="this" hx-swap="outerHTML">
      <label for="email">Email:</label>
      <input
      hx-post="/api/validate/email"
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      required
      style="margin-bottom: 0.5rem"
      value="${email}"
      />

      <div style="margin-top: 0.5rem; color: red;">Please enter a valid email address</div>
    </div>
    `)
  }
})

export default apiRouter
