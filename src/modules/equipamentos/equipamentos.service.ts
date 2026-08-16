import { equipamentosRepository } from './equipamentos.repository'
import { ConflitoError } from '../../shared/errors/AppError'
import { ERROR_CODES } from '../../erros/errorCodes'
import {
  CriarEquipamentoDto,
  AtualizarEquipamentoDto,
  FiltroEquipamentoDto,
} from './equipamentos.dto'

export const equipamentosService = {
  async listar(filtros: FiltroEquipamentoDto) {
    return equipamentosRepository.listar(filtros)
  },

  async buscarPorId(id: number) {
    return equipamentosRepository.buscarPorId(id)
  },

  async criar(dto: CriarEquipamentoDto) {
    return equipamentosRepository.criar(dto)
  },

  async atualizar(id: number, dto: AtualizarEquipamentoDto) {
    await equipamentosRepository.buscarPorId(id)
    return equipamentosRepository.atualizar(id, dto)
  },

  async desativar(id: number) {
    await equipamentosRepository.buscarPorId(id)
    return equipamentosRepository.desativar(id)
  },

  async reativar(id: number) {
    await equipamentosRepository.buscarPorId(id)
    return equipamentosRepository.reativar(id)
  },

  async listarTipos() {
    return equipamentosRepository.listarTipos()
  },

  async criarTipo(nome: string) {
    const existe = await equipamentosRepository.buscarTipoPorNome(nome)
    if (existe) throw new ConflitoError(ERROR_CODES.TIPO_EQUIPAMENTO_JA_EXISTE)

    return equipamentosRepository.criarTipo(nome)
  },
}
