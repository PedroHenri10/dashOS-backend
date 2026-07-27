import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
import { Prisma } from '@prisma/client'

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      sucesso: false,
      erro: err.mensagem,
    })
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025')
      return res.status(404).json({ sucesso: false, erro: 'Registro não encontrado' })
    if (err.code === 'P2002')
      return res.status(409).json({ sucesso: false, erro: 'Registro já existe' })
  }

  if (err.name === 'ZodError') {
    return res.status(400).json({ sucesso: false, erro: 'Dados inválidos', detalhes: (err as any).errors })
  }

  console.error('ERRO NÃO TRATADO:', err)
  return res.status(500).json({ sucesso: false, erro: 'Erro interno do servidor' })
}