import { Router } from 'express'
import { autenticar } from '../../shared/middlewares/auth.middleware'
import { clientesController } from './clientes.controller'

export const clientesRouter = Router()

clientesRouter.use(autenticar)

clientesRouter.get('/',           clientesController.listar)
clientesRouter.get('/:id',        clientesController.buscar)

clientesRouter.post('/',          clientesController.criar)
clientesRouter.put('/:id',        clientesController.atualizar)

clientesRouter.delete('/:id',     clientesController.desativar)
clientesRouter.patch('/:id/reativar', clientesController.reativar)