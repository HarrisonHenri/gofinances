export const getLastTransactionLabel = (type: 'up' | 'down' | 'total') => {
  if (type === 'total') return ''
  if (type === 'up') return 'Última entrada dia: '
  return 'Última saída dia: '
}
