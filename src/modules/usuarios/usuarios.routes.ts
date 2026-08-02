import { Router } from 'express'
import { autenticar, exigirPerfil } from '../../shared/middlewares/auth.middleware'
import { usuariosController } from './usuarios.controller'

export const usuariosRouter = Router()

usuariosRouter.use(autenticar)

usuariosRouter.get('/',        exigirPerfil('Administrador'), usuariosController.listar)
usuariosRouter.get('/perfis',  exigirPerfil('Administrador'), usuariosController.perfis)
usuariosRouter.get('/:id',     exigirPerfil('Administrador'), usuariosController.buscar)
usuariosRouter.post('/',       exigirPerfil('Administrador'), usuariosController.criar)
usuariosRouter.put('/:id',     exigirPerfil('Administrador'), usuariosController.atualizar)
usuariosRouter.delete('/:id',  exigirPerfil('Administrador'), usuariosController.desativar)