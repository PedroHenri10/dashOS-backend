import { FastifyReply, FastifyRequest } from 'fastify'
import { clientesService } from './clientes.service'
import {
  CriarClienteSchema,
  AtualizarClienteSchema,
  FiltroClienteSchema,
} from './clientes.dto'
import { ok, criado, semConteudo, paginado } from '../../shared/types/response.types'

type ListarRequest = FastifyRequest<{ Querystring: unknown }>
type BuscarRequest = FastifyRequest<{ Params: { id: string } }>
type CriarRequest = FastifyRequest<{ Body: unknown }>
type AtualizarRequest = FastifyRequest<{ Params: { id: string }; Body: unknown }>

export const clientesController = {
  async listar(request: ListarRequest, reply: FastifyReply) {
    const filtros = FiltroClienteSchema.parse(request.query)
    const { dados, total, pagina, limite } = await clientesService.listar(filtros)
    return paginado(reply, dados, { total, pagina, limite })
  },

  async buscar(request: BuscarRequest, reply: FastifyReply) {
    const cliente = await clientesService.buscarPorId(Number(request.params.id))
    return ok(reply, cliente)
  },

  async criar(request: CriarRequest, reply: FastifyReply) {
    const dto = CriarClienteSchema.parse(request.body)
    const cliente = await clientesService.criar(dto)
    return criado(reply, cliente)
  },

  async atualizar(request: AtualizarRequest, reply: FastifyReply) {
    const dto = AtualizarClienteSchema.parse(request.body)
    const cliente = await clientesService.atualizar(Number(request.params.id), dto)
    return ok(reply, cliente)
  },

  async desativar(request: BuscarRequest, reply: FastifyReply) {
    await clientesService.desativar(Number(request.params.id))
    return semConteudo(reply)
  },

  async reativar(request: BuscarRequest, reply: FastifyReply) {
    const cliente = await clientesService.reativar(Number(request.params.id))
    return ok(reply, cliente, 'Cliente reativado com sucesso')
  },
}
