import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import auth from '@react-native-firebase/auth'
import { AxiosRequestHeaders } from 'axios'

import { api } from '../services/api'

interface AuthCredentials {
  email: string
  password: string
}

interface AuthContextData {
  isAuth: boolean
  loading: boolean
  signIn(data: AuthCredentials): void
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(false)

  const signIn = useCallback((data: AuthCredentials) => {
    setLoading(true)
    auth().createUserWithEmailAndPassword(data.email, data.password)
  }, [])

  useEffect(() => {
    auth().onAuthStateChanged(userCred => {
      if (userCred) {
        userCred.getIdToken().then(token => {
          setIsAuth(true)
          setLoading(false)
          AsyncStorage.setItem('@gofinances:token', token)
          ;(
            api.defaults.headers as unknown as AxiosRequestHeaders
          ).Authorization = `Bearer ${token}`
        })
      }
    })
  }, [])

  useEffect(() => {
    async function loadToken() {
      setLoading(true)
      const token = await AsyncStorage.getItem('@gofinances:token')

      setLoading(false)
      ;(
        api.defaults.headers as unknown as AxiosRequestHeaders
      ).Authorization = `Bearer ${token}`
    }

    loadToken()
  }, [])

  const signOut = useCallback(async () => {
    setIsAuth(false)
    await AsyncStorage.removeItem('@gofinances:token')
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
