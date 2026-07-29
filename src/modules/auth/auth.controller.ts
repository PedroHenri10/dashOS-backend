import { Request, Response } from 'express'
import { authService } from './auth.service'
import { LoginSchema, RefreshSchema } from './auth.dto'
import { ok } from '../../shared/types/response.types'

export const authController = {
  async login(req: Request, res: Response) {
    const dto = LoginSchema.parse(req.body)
    const resultado = await authService.login(dto)
    return ok(res, resultado, 'Login realizado com sucesso')
  },

  async refresh(req: Request, res: Response) {
    const { refreshToken } = RefreshSchema.parse(req.body)
    const resultado = await authService.refresh(refreshToken)
    return ok(res, resultado)
  },

  async me(req: Request, res: Response) {
    const resultado = await authService.me(req.user!.sub)
    return ok(res, resultado)
  },
}