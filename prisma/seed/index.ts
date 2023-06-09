import {PrismaClient} from '@prisma/client'
import logger from 'terminal-kit'

import {seedUsers} from './data/development/users'
import { seedDevices } from './data/development/devices'

const prisma = new PrismaClient()
const terminal = logger.terminal

const handleSeedResp = resp => {
  const separatorChar = '-'
  const separatorStr = separatorChar.repeat(40)

  terminal.green(`\n${separatorStr}\n\n`)

  return resp
}

const isProductionEnv = process.env.NODE_ENV === 'production'

export const seed = async () => {
  const internal = {
    users: [],
    devices: []
  }

  const seedDeps = {prisma, terminal, internal}

  if(!isProductionEnv) {
    seedDeps.internal.users = await seedUsers(seedDeps).then(handleSeedResp)
    seedDeps.internal.devices = await seedDevices(seedDeps).then(handleSeedResp)
  }

  process.exit(0)
}
seed()
