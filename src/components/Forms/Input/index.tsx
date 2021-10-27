import React from 'react'
import { TextInputProps as Props } from 'react-native'

import { Container } from './styles'

export function Input({ ...rest }: Props) {
  return <Container {...rest} />
}
