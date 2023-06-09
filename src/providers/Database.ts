import Prisma from '@prisma/client'

import Log from '../middlewares/Log'

export class Database {
  public client

  public constructor() {
    this.client = this.setClient()
    this.connect().then()
  }

  private async connect() {
    Log.info('DATABASE :: Trying to connect')
    try {
      await this.client.$connect()
      Log.info('DATABASE :: Connected to the database')
    } catch (error) {
      Log.info('DATABASE :: Failed to connect to the database')
    }
  }

  /**
   * PrismaClient is not available when testing
   */
  private setClient() {
    const {PrismaClient} = Prisma || {}
    return PrismaClient ? new PrismaClient() : {}
  }

}

export default new Database
