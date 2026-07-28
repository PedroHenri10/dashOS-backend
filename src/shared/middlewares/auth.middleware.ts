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

function isJwtPayload(value: unknown): value is JwtPayload {
  if (typeof value !== 'object' || value === null) return false

  const candidate = value as Partial<JwtPayload>
  return typeof candidate.sub === 'number' && typeof candidate.nome === 'string' && typeof candidate.perfil === 'string'
}

export function autenticar(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) throw new NaoAutorizadoError()

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    if (!isJwtPayload(decoded)) {
      throw new NaoAutorizadoError()
    }

    req.user = decoded
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