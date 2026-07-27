import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { NaoAutorizadoError, ProibidoError } from '../errors/AppError'

export interface JwtPayload {
  sub: number
  nome: string
  perfil: string
}

declare global {
  namespace Express {
    interface Request { user?: JwtPayload }
  }
}

export function autenticar(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) throw new NaoAutorizadoError()

  const token = authHeader.split(' ')[1]
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    next()
  } catch {
    throw new NaoAutorizadoError()
  }
}

export function exigirPerfil(...perfis: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !perfis.includes(req.user.perfil)) throw new ProibidoError()
    next()
  }
}