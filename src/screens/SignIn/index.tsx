import React, { useCallback } from 'react'

import { RFValue } from 'react-native-responsive-fontsize'

import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'
import { api } from '../../services/api'
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Content,
  ContentWrapper,
} from './styles'

export function SignIn() {
  const zumba = useCallback(async () => {
    const uri = '/api/v1/sessions/google'
    const response = await api.get(uri)

    console.log(response)
  }, [])

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>Faça seu login com{'\n'}uma das contas abaixo</SignInTitle>
      </Header>

      <Content>
        <ContentWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={zumba}
          />
        </ContentWrapper>
      </Content>
    </Container>
  )
}
