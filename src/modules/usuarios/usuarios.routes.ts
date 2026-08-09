import { FastifyPluginAsync } from 'fastify'
import { autenticar, exigirPerfil } from '../../shared/middlewares/auth.middleware'
import { usuariosController } from './usuarios.controller'

export const usuariosRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', { preHandler: [autenticar, exigirPerfil('Administrador')] }, usuariosController.listar)
  app.get('/perfis', { preHandler: [autenticar, exigirPerfil('Administrador')] }, usuariosController.perfis)
  app.get<{ Params: { id: string } }>('/:id', { preHandler: [autenticar, exigirPerfil('Administrador')] }, usuariosController.buscar)
  app.post('/', { preHandler: [autenticar, exigirPerfil('Administrador')] }, usuariosController.criar)
  app.put<{ Params: { id: string } }>('/:id', { preHandler: [autenticar, exigirPerfil('Administrador')] }, usuariosController.atualizar)
  app.delete<{ Params: { id: string } }>('/:id', { preHandler: [autenticar, exigirPerfil('Administrador')] }, usuariosController.desativar)
}