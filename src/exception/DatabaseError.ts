import {Response} from 'express'

import Log from '../middlewares/Log'

/**
 * @TODO Handle errors from https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
 */
class DatabaseError extends Error {
  code?: string
  details?: {
    target?: string;
    field_name?: string;
    cause?: string;
  }

  constructor(prismaError) {
    super(prismaError.message)

    this.assignValues(prismaError)

    Log.error(`Database error - ${this.message}`)
  }

  public handle(res: Response) {
    const target = this.details?.target ?? ''
    const fieldName = this.details?.field_name ?? ''

    const errorMessageMap = {
      'P2002': `${target} field has to be unique`,
      'P2003': `Foreign key constraint failed on the field: ${fieldName}`,
      'P2025': 'An operation failed because it depends on one or more records that were required but not found'
    }

    const responseBody = {
      error: this.code,
      message: errorMessageMap[this.code]
    }

    return res
      .status(422)
      .send(responseBody)
  }

  public isClientError() {
    return this.code.startsWith('P2')
  }

  public isConstraintError() {
    return this.code === 'P2002'
  }

  public isForeignKeyError() {
    return this.code === 'P2003'
  }

  public isRecordNotFoundError() {
    return this.code === 'P2025'
  }

  private assignValues(err) {
    this.code = err.code
    this.details = err.meta
  }
}

export default DatabaseError
