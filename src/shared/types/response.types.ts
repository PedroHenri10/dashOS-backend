import { FastifyReply } from 'fastify'

export function ok<T>(reply: FastifyReply, dados: T, mensagem?: string) {
  return reply.status(200).send({ sucesso: true, dados, mensagem })
}

export function criado<T>(reply: FastifyReply, dados: T) {
  return reply.status(201).send({ sucesso: true, dados })
}

export function semConteudo(reply: FastifyReply) {
  return reply.status(204).send()
}

export function paginado<T>(
  reply: FastifyReply,
  dados: T[],
  paginacao: { total: number; pagina: number; limite: number }
) {
  return reply.status(200).send({
    sucesso: true,
    dados,
    paginacao: {
      ...paginacao,
      totalPaginas: Math.ceil(paginacao.total / paginacao.limite),
    },
  })
}