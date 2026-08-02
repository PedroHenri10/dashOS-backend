import bcrypt from 'bcrypt'
import { usuariosRepository } from './usuarios.repository'
import { ConflitoError } from '../../shared/errors/AppError'
import { CriarUsuarioDto, AtualizarUsuarioDto, FiltroUsuarioDto } from './usuarios.dto'

export const usuariosService = {

  async listar(filtros: FiltroUsuarioDto) {
    return usuariosRepository.listar(filtros)
  },

  async buscarPorId(id: number) {
   
    return usuariosRepository.buscarPorId(id)
  },

  async criar(dto: CriarUsuarioDto) {
    const emailEmUso = await usuariosRepository.buscarPorEmail(dto.email)
    if (emailEmUso) throw new ConflitoError('E-mail já cadastrado')

    const senhaHash = await bcrypt.hash(dto.senha, 10)

    return usuariosRepository.criar({ ...dto, senha: senhaHash })
  },

  async atualizar(id: number, dto: AtualizarUsuarioDto) {
    await usuariosRepository.buscarPorId(id)
    return usuariosRepository.atualizar(id, dto)
  },

  async desativar(id: number) {
    await usuariosRepository.buscarPorId(id)
    return usuariosRepository.desativar(id)
  },

  listarPerfis: () => usuariosRepository.listarPerfis(),

}