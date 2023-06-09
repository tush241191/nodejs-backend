import pino from 'pino'

class Log {
  public pino

  constructor () {
    this.pino = pino()
  }

  public trace (msg: string, data = {}): void {
    this.pino.trace(data, msg)
  }

  public debug (msg: string, data = {}): void {
    this.pino.debug(data, msg)
  }

  public info (msg: string, data = {}): void {
    this.pino.info(data, msg)
  }

  public warn (msg: string, data = {}): void {
    this.pino.warn(data, msg)
  }

  public error (msg: string, data = {}): void {
    this.pino.error(data, msg)
  }

  public fatal (msg: string, data = {}): void {
    this.pino.fatal(data, msg)
  }
}

export default new Log
