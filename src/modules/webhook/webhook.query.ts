import SqlString from 'sqlstring'

export const selectQuery = (opt: { selectFields: string[] }) => {
  const selectFields = opt.selectFields.map((field) => SqlString.escape(field))

  return `SELECT ${selectFields.join(', ')} FROM 'generals'`
}
