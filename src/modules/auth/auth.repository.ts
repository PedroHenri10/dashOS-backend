import prisma from '../../shared/lib/prisma'

export const authRepository = {
  buscarPorEmail: (email: string) =>
    prisma.usuario.findUnique({
      where: { email },
      include: { perfil: true },
    }),

  buscarPorId: (id: number) =>
    prisma.usuario.findUnique({
      where: { id },
      include: { perfil: true },
      omit: { senha: true }, 
    }),
}