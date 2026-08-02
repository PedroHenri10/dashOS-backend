import { Request, Response } from 'express'
import { clientesService } from './clientes.service'
import {
  CriarClienteSchema,
  AtualizarClienteSchema,
  FiltroClienteSchema,
} from './clientes.dto'
import { ok, criado, semConteudo, paginado } from '../../shared/types/response.types'

export const clientesController = {

  async listar(req: Request, res: Response) {
    const filtros = FiltroClienteSchema.parse(req.query)
    const { dados, total, pagina, limite } = await clientesService.listar(filtros)
    return paginado(res, dados, { total, pagina, limite })
  },

  async buscar(req: Request, res: Response) {
    const cliente = await clientesService.buscarPorId(+req.params.id)
    return ok(res, cliente)
  },

  async criar(req: Request, res: Response) {
    const dto = CriarClienteSchema.parse(req.body)
    const cliente = await clientesService.criar(dto)
    return criado(res, cliente)
  },

  async atualizar(req: Request, res: Response) {
    const dto = AtualizarClienteSchema.parse(req.body)
    const cliente = await clientesService.atualizar(+req.params.id, dto)
    return ok(res, cliente)
  },

  async desativar(req: Request, res: Response) {
    await clientesService.desativar(+req.params.id)
    return semConteudo(res)
  },

  async reativar(req: Request, res: Response) {
    const cliente = await clientesService.reativar(+req.params.id)
    return ok(res, cliente, 'Cliente reativado com sucesso')
  },
}