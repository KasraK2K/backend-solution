export interface IErrorOpt {
  statusCode: number
  message?: string
  batch_messages?: string[]
}

class AppError extends Error {
  public statusCode: number
  public cause: Record<string, any>

  constructor(opt: Omit<IErrorOpt, 'batch_messages'>) {
    const { message, statusCode } = opt

    super(message)

    this.statusCode = statusCode
    this.name = this.constructor.name
    this.cause = Object.create(null)
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
