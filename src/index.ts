import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto'

const prisma = new PrismaClient()

const generateRandomToken = () => {
  return randomBytes(48).toString('base64').replace(/[+/]/g, '.')
}

const userPassword = 'Malwarebytes'

async function main() {
   const newUser = await prisma.user.create({
    data: {
      firstName: 'Tushar',
      lastName: 'Kharat',
      email: 'tushar.kharat@malwarebytes.com',
      password: userPassword,
      refreshId: generateRandomToken(),
      role: 'Client'
    },
  })
  console.log('Created new user: ', newUser)

  const allUsers = await prisma.user.findMany()
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
