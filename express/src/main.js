import express from 'express'
import { handleRequest } from './api/movements/validation/post.js'

const port = 80

const app = express()

app.post('/movements/validation', handleRequest)

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`)
})
