import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { errorHandler } from './shared/middlewares/error.middleware'
import { authRoutes } from './modules/auth/auth.routes'
import { usuariosRoutes } from './modules/usuarios/usuarios.routes'
import { clientesRoutes } from './modules/clientes/clientes.routes'

const app = fastify({ logger: false })

app.register(fastifyCors, { origin: true })
app.register(fastifyHelmet)

app.get('/health', async () => ({ status: 'ok', timestamp: new Date() }))

app.register(authRoutes, { prefix: '/auth' })
app.register(usuariosRoutes, { prefix: '/usuarios' })
app.register(clientesRoutes, { prefix: '/clientes' })

app.setErrorHandler(errorHandler)

export default app