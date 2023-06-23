export interface IErrorOpt {
  status: number
  label: string
  code: number | string
  message: string
  file?: IErrorFilePath
  batch_messages?: string[]
}

export interface IErrorFilePath {
  name: string
  path: string
}

class AppError extends Error {
  public status: number
  public label: string
  public code: number | string
  public message: string
  public file?: IErrorFilePath
  public batch_messages?: string[]

  constructor(opt: IErrorOpt) {
    const { status, label, code, message, batch_messages } = opt

    super(message)

    // this.name = this.constructor.name
    this.status = status
    this.label = label
    this.code = code
    this.message = message
    this.file = Object.create(null)
    this.batch_messages = batch_messages
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
