import React from 'react'

import { StatementDTO } from '../../dtos/StatementDTO'
import { categories } from '../../utils/categories'
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles'

interface Props {
  data: StatementDTO
}

export function TransactionCard({ data }: Props) {
  const [category] = categories.filter(item => item.key === data.category)

  return (
    <Container>
      <Title>{data.description}</Title>

      <Amount type={data.type}>
        {data.type === 'withdraw' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.updated_at}</Date>
      </Footer>
    </Container>
  )
}
