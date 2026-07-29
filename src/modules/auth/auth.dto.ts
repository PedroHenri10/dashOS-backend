import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Senha obrigatória'),
})

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token obrigatório'),
})

export type LoginDto   = z.infer<typeof LoginSchema>
export type RefreshDto = z.infer<typeof RefreshSchema>