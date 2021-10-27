import { StatementDTO } from '../dtos/StatementDTO'

export const resumeMap = {
  purchases: {
    amount: 0,
    color: '#5636D3',
    name: 'Compras',
    percent: 0,
  },
  food: {
    amount: 0,
    color: '#FF872C',
    name: 'Alimentação',
    percent: 0,
  },
  salary: {
    amount: 0,
    color: '#12A454',
    name: 'Salário',
    percent: 0,
  },
  car: {
    amount: 0,
    color: '#E83F5B',
    name: 'Carro',
    percent: 0,
  },
  leisure: {
    amount: 0,
    color: '#26195C',
    name: 'Lazer',
    percent: 0,
  },
  studies: {
    amount: 0,
    color: '#9C001A',
    name: 'Estudos',
    percent: 0,
  },
}

export const formatResume = (statements: StatementDTO[]) => {
  const totalExpensives = statements.reduce((prev, curr) => {
    if (curr.type === 'deposit') {
      return prev
    }

    return prev + Number(curr.amount)
  }, 0)

  return statements.reduce((prev, curr) => {
    const item = prev[curr.category as keyof typeof resumeMap]

    if (curr.type === 'deposit') {
      return {
        ...prev,
        [curr.category]: {
          ...item,
          amount: item.amount + curr.amount,
        },
      }
    }

    return {
      ...prev,
      [curr.category]: {
        ...item,
        amount: item.amount + curr.amount,
        percent:
          item.percent +
          Number(((Number(curr.amount) / totalExpensives) * 100).toFixed(0)),
      },
    }
  }, resumeMap)
}
