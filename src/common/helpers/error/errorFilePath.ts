/* --------------------------------- Module --------------------------------- */
import AppError from './AppError'

const errorFilePath = (error: unknown | Error | AppError) => {
  if ((error instanceof Error || error instanceof AppError) && error.stack) {
    const stack = error.stack.split('\n').map((line) => line.trim())
    let line: string = stack[2]

    // error instanceof AppError || error instanceof Error ? (line = stack[1]) : (line = stack[2])

    const hasParentheses = line.endsWith(')')
    let file_path: string
    let file_name: string

    if (hasParentheses) {
      file_path = line.slice(line.indexOf('(') + 1, line.length - 1)
      file_name = line.slice(line.lastIndexOf('/') + 1, line.indexOf(':'))
    } else {
      file_path = line.slice(line.indexOf('/'))
      file_name = line.slice(line.lastIndexOf('/') + 1, line.indexOf(':'))
    }

    return { file_name, file_path }
  } else return { file_name: 'unknown', file_path: 'unknown' }
}

export default errorFilePath
