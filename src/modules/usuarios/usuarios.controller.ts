import { Request, Response } from 'express'
import { usuariosService } from './usuarios.service'
import {
  CriarUsuarioSchema,
  AtualizarUsuarioSchema,
  FiltroUsuarioSchema,
} from './usuarios.dto'
import { ok, criado, semConteudo, paginado } from '../../shared/types/response.types'

export const usuariosController = {

  async listar(req: Request, res: Response) {
    const filtros = FiltroUsuarioSchema.parse(req.query)
    const { dados, total, pagina, limite } = await usuariosService.listar(filtros)
    return paginado(res, dados, { total, pagina, limite })
  },

  async buscar(req: Request, res: Response) {
    const usuario = await usuariosService.buscarPorId(+req.params.id)
    return ok(res, usuario)
  },

  async criar(req: Request, res: Response) {
    const dto = CriarUsuarioSchema.parse(req.body)
    const usuario = await usuariosService.criar(dto)
    return criado(res, usuario)
  },

  async atualizar(req: Request, res: Response) {
    const dto = AtualizarUsuarioSchema.parse(req.body)
    const usuario = await usuariosService.atualizar(+req.params.id, dto)
    return ok(res, usuario)
  },

  async desativar(req: Request, res: Response) {
    await usuariosService.desativar(+req.params.id)
    return semConteudo(res)
  },

  async perfis(req: Request, res: Response) {
    const perfis = await usuariosService.listarPerfis()
    return ok(res, perfis)
  },

}