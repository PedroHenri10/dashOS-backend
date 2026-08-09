import 'dotenv/config'
import app from './app'

const PORT = Number(process.env.PORT) || 3333

app.listen({ port: PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`DashOS rodando em http://localhost:${PORT}`)
  })
  .catch((error) => {
    console.error('Erro ao iniciar servidor:', error)
    process.exit(1)
  })