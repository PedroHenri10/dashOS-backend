import { FastifyReply, FastifyRequest } from 'fastify'
import { fornecedoresService } from './fornecedores.service'
import {
  CriarFornecedorSchema,
  AtualizarFornecedorSchema,
  FiltroFornecedorSchema,
} from './fornecedores.dto'
import { ok, criado, semConteudo, paginado } from '../../shared/types/response.types'

type ListarRequest = FastifyRequest<{ Querystring: unknown }>
type BuscarRequest = FastifyRequest<{ Params: { id: string } }>
type CriarRequest = FastifyRequest<{ Body: unknown }>
type AtualizarRequest = FastifyRequest<{ Params: { id: string }; Body: unknown }>

export const fornecedoresController = {
  async listar(request: ListarRequest, reply: FastifyReply) {
    const filtros = FiltroFornecedorSchema.parse(request.query)
    const { dados, total, pagina, limite } = await fornecedoresService.listar(filtros)
    return paginado(reply, dados, { total, pagina, limite })
  },

  async buscar(request: BuscarRequest, reply: FastifyReply) {
    const fornecedor = await fornecedoresService.buscarPorId(Number(request.params.id))
    return ok(reply, fornecedor)
  },

  async criar(request: CriarRequest, reply: FastifyReply) {
    const dto = CriarFornecedorSchema.parse(request.body)
    const fornecedor = await fornecedoresService.criar(dto)
    return criado(reply, fornecedor)
  },

  async atualizar(request: AtualizarRequest, reply: FastifyReply) {
    const dto = AtualizarFornecedorSchema.parse(request.body)
    const fornecedor = await fornecedoresService.atualizar(Number(request.params.id), dto)
    return ok(reply, fornecedor)
  },

  async desativar(request: BuscarRequest, reply: FastifyReply) {
    await fornecedoresService.desativar(Number(request.params.id))
    return semConteudo(reply)
  },

  async reativar(request: BuscarRequest, reply: FastifyReply) {
    const fornecedor = await fornecedoresService.reativar(Number(request.params.id))
    return ok(reply, fornecedor, 'Fornecedor reativado com sucesso')
  },
}
