import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import GoogleSvg from '../../assets/google.svg'
import { ControlledInput } from '../../components/Forms/ControlledInput'
import { SignInButton } from '../../components/SignInSocialButton'
import { useAuth } from '../../hooks/auth'
import { Container } from './styles'

const schema = Yup.object().shape({
  email: Yup.string().required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
})

interface FormData {
  email: string
  password: string
}

export function SignIn() {
  const { signIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleSignIn(form: FormData) {
    reset()
    signIn(form)
  }

  return (
    <Container>
      <ControlledInput
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        name="email"
        autoCapitalize="none"
        control={control}
        error={errors.name && errors.email.message}
      />
      <ControlledInput
        placeholder="Senha"
        autoCorrect={false}
        name="password"
        autoCapitalize="none"
        secureTextEntry
        control={control}
        error={errors.name && errors.password.message}
      />

      <SignInButton
        title="Entrar"
        svg={GoogleSvg}
        onPress={handleSubmit(handleSignIn)}
      />
    </Container>
  )
}
