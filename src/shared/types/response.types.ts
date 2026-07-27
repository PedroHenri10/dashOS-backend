import { Response } from 'express'

export function ok<T>(res: Response, dados: T, mensagem?: string) {
  return res.status(200).json({ sucesso: true, dados, mensagem })
}

export function criado<T>(res: Response, dados: T) {
  return res.status(201).json({ sucesso: true, dados })
}

export function semConteudo(res: Response) {
  return res.status(204).send()
}

export function paginado<T>(
  res: Response,
  dados: T[],
  paginacao: { total: number; pagina: number; limite: number }
) {
  return res.status(200).json({
    sucesso: true,
    dados,
    paginacao: {
      ...paginacao,
      totalPaginas: Math.ceil(paginacao.total / paginacao.limite),
    },
  })
}