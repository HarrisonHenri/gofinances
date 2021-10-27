export const formatLastTransaction = (date: Date) =>
  `${date.getDate()} de ${date.toLocaleString('pt-BR', {
    month: 'long',
  })}`
