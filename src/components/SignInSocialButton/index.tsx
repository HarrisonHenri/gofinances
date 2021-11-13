import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { Button, Text } from './styles'

interface Props extends TouchableOpacityProps {
  title: string
  svg: React.FC<SvgProps>
}

export function SignInButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <Button {...rest}>
      <Text>{title}</Text>
    </Button>
  )
}
