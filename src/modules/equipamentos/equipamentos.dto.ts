import { z } from 'zod'

export const CriarEquipamentoSchema = z.object({
  nome:         z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  marca:        z.string().optional(),
  modelo:       z.string().optional(),
  serie_imei:   z.string().optional(),
  cor:          z.string().optional(),
  cod_etiqueta: z.string().optional(),
  tipo_id:      z.number().int().positive('Tipo de equipamento inválido'),
  cliente_id:   z.number().int().positive('Cliente inválido'),
})

export const AtualizarEquipamentoSchema = CriarEquipamentoSchema.partial()

export const FiltroEquipamentoSchema = z.object({
  busca:      z.string().optional(),
  tipo_id:    z.coerce.number().int().positive().optional(),
  cliente_id: z.coerce.number().int().positive().optional(),
  ativo:      z.enum(['true', 'false']).optional(),
  pagina:     z.coerce.number().default(1),
  limite:     z.coerce.number().default(20),
})

export const CriarTipoEquipamentoSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
})

export type CriarEquipamentoDto      = z.infer<typeof CriarEquipamentoSchema>
export type AtualizarEquipamentoDto  = z.infer<typeof AtualizarEquipamentoSchema>
export type FiltroEquipamentoDto     = z.infer<typeof FiltroEquipamentoSchema>
export type CriarTipoEquipamentoDto  = z.infer<typeof CriarTipoEquipamentoSchema>
