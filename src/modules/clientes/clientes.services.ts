import { clientesRepository } from './clientes.repository'
import { ConflitoError, NaoEncontradoError } from '../../shared/errors/AppError'
import { CriarClienteDto, AtualizarClienteDto, FiltroClienteDto } from './clientes.dto'

export const clientesService = {

  async listar(filtros: FiltroClienteDto) {
    return clientesRepository.listar(filtros)
  },

  async buscarPorId(id: number) {
    return clientesRepository.buscarPorId(id)
  },

  async criar(dto: CriarClienteDto) {
    if (dto.cpf_cnpj) {
      const existe = await clientesRepository.buscarPorCpfCnpj(dto.cpf_cnpj)
      if (existe) throw new ConflitoError('CPF/CNPJ já cadastrado')
    }

    return clientesRepository.criar(dto)
  },

  async atualizar(id: number, dto: AtualizarClienteDto) {
    await clientesRepository.buscarPorId(id)

    if (dto.cpf_cnpj) {
      const existe = await clientesRepository.buscarPorCpfCnpj(dto.cpf_cnpj)
      if (existe && existe.id !== id)
        throw new ConflitoError('CPF/CNPJ já cadastrado para outro cliente')
    }

    return clientesRepository.atualizar(id, dto)
  },

  async desativar(id: number) {
    await clientesRepository.buscarPorId(id)
    return clientesRepository.desativar(id)
  },

  async reativar(id: number) {
    await clientesRepository.buscarPorId(id)
    return clientesRepository.reativar(id)
  },
}