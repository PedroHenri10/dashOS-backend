import 'dotenv/config'
import prisma from './src/shared/lib/prisma'
import bcrypt from 'bcrypt'

async function main() {
  const senhaHash = await bcrypt.hash('admin123', 10)
  const usuario = await prisma.usuario.create({
    data: {
      nome_completo: 'Admin DashOS',
      email: 'admin@dashos.com',
      senha: senhaHash,
      telefone: '000000000',
      ativo: true,
      perfil: {
        connectOrCreate: {
          where: { nome: 'Administrador' },
          create: { nome: 'Administrador' },
        },
      },
    },
  })
  console.log('ADMIN CREATED', usuario)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
