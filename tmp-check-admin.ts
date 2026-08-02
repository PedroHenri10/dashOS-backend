import 'dotenv/config'
import prisma from './src/shared/lib/prisma'

async function main() {
  const user = await prisma.usuario.findUnique({
    where: { email: 'admin@dashos.com' },
    include: { perfil: true },
  })
  console.log(JSON.stringify(user, null, 2))
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
