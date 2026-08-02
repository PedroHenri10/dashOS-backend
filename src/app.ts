import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorMiddleware } from './shared/middlewares/error.middleware'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.use('/auth', async (_req, res, next) => {
  try {
    const { authRouter } = await import('./modules/auth/auth.routes')
    return authRouter(_req, res, next)
  } catch (error) {
    next(error)
  }
})

app.use('/usuarios', async (_req, res, next) => {
  try {
    const { usuariosRouter } = await import('./modules/usuarios/usuarios.routes')
    return usuariosRouter(_req, res, next)
  } catch (error) {
    next(error)
  }
})

app.use('/clientes', async (_req, res, next) => {
  try {
    const { clientesRouter } = await import('./modules/clientes/clientes.routes')
    return clientesRouter(_req, res, next)
  } catch (error) {
    next(error)
  }
})

app.use(errorMiddleware)

export default app