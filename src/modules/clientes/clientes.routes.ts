import { FastifyPluginAsync } from 'fastify'
import { autenticar } from '../../shared/middlewares/auth.middleware'
import { clientesController } from './clientes.controller'

export const clientesRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', { preHandler: autenticar }, clientesController.listar)
  app.get<{ Params: { id: string } }>('/:id', { preHandler: autenticar }, clientesController.buscar)
  app.post('/', { preHandler: autenticar }, clientesController.criar)
  app.put<{ Params: { id: string } }>('/:id', { preHandler: autenticar }, clientesController.atualizar)
  app.delete<{ Params: { id: string } }>('/:id', { preHandler: autenticar }, clientesController.desativar)
  app.patch<{ Params: { id: string } }>('/:id/reativar', { preHandler: autenticar }, clientesController.reativar)
}