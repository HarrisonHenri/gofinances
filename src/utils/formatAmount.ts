export const formatAmount = (amount: number) =>
  Number(amount).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
