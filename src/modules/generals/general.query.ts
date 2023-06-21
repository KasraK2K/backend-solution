export const selectQuery = (opt: { selectFields: string[] }) => {
  return `SELECT ${opt.selectFields.join(', ')} FROM 'generals'`
}
