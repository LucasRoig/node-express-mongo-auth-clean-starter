import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { AuthController } from './controllers'
import makeCallback from './express-callback'

dotenv.config()

const app = express()
app.use(bodyParser.json())

app.post('/auth/register', makeCallback(AuthController.register))

if (process.env.ENV === 'dev') {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 3000')
  })
}

export default app
