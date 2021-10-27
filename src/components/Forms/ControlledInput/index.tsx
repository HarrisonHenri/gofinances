import React from 'react'
import { TextInputProps } from 'react-native'

import { Control, Controller } from 'react-hook-form'

import { Input } from '../Input'
import { Container, Error } from './styles'

interface Props extends TextInputProps {
  control: Control
  name: string
  error?: string
}

export function ControlledInput({ control, error, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} value={value} onChangeText={onChange} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}
