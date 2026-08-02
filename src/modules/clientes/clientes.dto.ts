import { z } from 'zod'

export const CriarClienteSchema = z.object({
  nome:      z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  tipo: z.enum(['PF', 'PJ'], { message: 'Tipo deve ser PF ou PJ' }),
  cpf_cnpj:  z.string().optional(),
  telefone_1: z.string().min(8, 'Telefone inválido'),
  telefone_2: z.string().optional(),
  email:     z.string().email('E-mail inválido').optional().or(z.literal('')),
  observacao: z.string().optional(),

  logradouro:  z.string().optional(),
  numero:      z.string().optional(),
  complemento: z.string().optional(),
  bairro:      z.string().optional(),
  cidade:      z.string().optional(),
  estado:      z.string().max(2, 'Use a sigla do estado (ex: SP)').optional(),
  cep:         z.string().optional(),
})

export const AtualizarClienteSchema = CriarClienteSchema.partial()

export const FiltroClienteSchema = z.object({
  busca:  z.string().optional(),
  tipo:   z.enum(['PF', 'PJ']).optional(),
  ativo:  z.enum(['true', 'false']).optional(),
  pagina: z.coerce.number().default(1),
  limite: z.coerce.number().default(20),
})

export type CriarClienteDto     = z.infer<typeof CriarClienteSchema>
export type AtualizarClienteDto = z.infer<typeof AtualizarClienteSchema>
export type FiltroClienteDto    = z.infer<typeof FiltroClienteSchema>