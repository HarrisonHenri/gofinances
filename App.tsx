import React from 'react'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { StatusBar } from 'react-native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components/native'

import theme from './src/global/styles/theme'
import { AuthProvider } from './src/hooks/auth'
import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}
