import { NavigationProp, RouteProp } from '@react-navigation/native'

export type RootParamList = {
  Listagem: undefined
  Cadastrar: undefined
  Resumo: undefined
}

export type RootParams<Route extends keyof RootParamList> = RouteProp<
  RootParamList,
  Route
>

export type AppNavigationProps = NavigationProp<RootParamList>
