import { FastifyPluginAsync } from 'fastify'
import { Perfil } from '@prisma/client'
import { autenticar, exigirPerfil } from '../../shared/middlewares/auth.middleware'
import { fornecedoresController } from './fornecedores.controller'

// Consulta é liberada para Técnico e Administrador (ex.: ao registrar a origem
// de uma peça). Cadastro, edição e inativação ficam restritos ao Administrador,
// que absorveu essa responsabilidade do antigo perfil Atendente.
export const fornecedoresRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', { preHandler: autenticar }, fornecedoresController.listar)
  app.get<{ Params: { id: string } }>('/:id', { preHandler: autenticar }, fornecedoresController.buscar)

  app.post('/', { preHandler: [autenticar, exigirPerfil(Perfil.ADMINISTRADOR)] }, fornecedoresController.criar)
  app.put<{ Params: { id: string } }>('/:id', { preHandler: [autenticar, exigirPerfil(Perfil.ADMINISTRADOR)] }, fornecedoresController.atualizar)
  app.delete<{ Params: { id: string } }>('/:id', { preHandler: [autenticar, exigirPerfil(Perfil.ADMINISTRADOR)] }, fornecedoresController.desativar)
  app.patch<{ Params: { id: string } }>('/:id/reativar', { preHandler: [autenticar, exigirPerfil(Perfil.ADMINISTRADOR)] }, fornecedoresController.reativar)
}
