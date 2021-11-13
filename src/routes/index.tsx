import React from 'react'
import { ActivityIndicator } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { useAuth } from '../hooks/auth'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

const Routes: React.FC = () => {
  const { isAuth, loading } = useAuth()
  const theme = useTheme()

  if (loading) {
    return <ActivityIndicator color={theme.colors.primary} size="large" />
  }

  return (
    <NavigationContainer>
      {isAuth ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export default Routes
