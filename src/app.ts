import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorMiddleware } from './shared/middlewares/error.middleware'
import { authRouter } from './modules/auth/auth.routes'
import { usuariosRouter } from './modules/usuarios/usuarios.routes'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.use('/auth', authRouter) 
app.use('/usuarios', usuariosRouter) 

app.use(errorMiddleware)

export default app