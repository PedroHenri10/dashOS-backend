import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorMiddleware } from './shared/middlewares/error.middleware'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})


app.use(errorMiddleware) 

export default app