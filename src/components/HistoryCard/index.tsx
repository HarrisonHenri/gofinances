import React from 'react'

import { Container, Title, Amount } from './styles'

interface Props {
  color: string
  name: string
  amount: string
}

export function HistoryCard({ name, color, amount }: Props) {
  return (
    <Container color={color}>
      <Title>{name}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
