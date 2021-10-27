import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TrasactionCard'
import { HighlightsDTO } from '../../dtos/HighlightsDTO'
import { StatementDTO } from '../../dtos/StatementDTO'
import { api } from '../../services/api'
import { formatAmount } from '../../utils/formatAmount'
import { formatDate } from '../../utils/formatDate'
import { formatLastTransaction } from '../../utils/formatLastTransaction'
import {
  Container,
  Header,
  Photo,
  User,
  UserInfo,
  UserGretting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoaderContainer,
} from './styles'

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<StatementDTO[]>([])
  const [highlighData, setHighlighData] = useState<HighlightsDTO>(
    {} as HighlightsDTO,
  )

  const theme = useTheme()

  const fetchData = useCallback(async () => {
    let deposits = 0
    let withdraws = 0
    let depositLastTransaction = 0
    let withdrawLastTransaction = 0

    try {
      const uri = '/api/v1/statements/balance'
      const response = await api.get<{
        statement: StatementDTO[]
        balance: number
      }>(uri)

      const parsedResponse = response.data.statement.map(statement => {
        const currentTime = new Date(statement.updated_at).getTime()

        if (statement.type === 'deposit') {
          deposits += Number(statement.amount)

          if (currentTime > depositLastTransaction) {
            depositLastTransaction = currentTime
          }
        }

        if (statement.type === 'withdraw') {
          withdraws += Number(statement.amount)

          if (currentTime > depositLastTransaction) {
            withdrawLastTransaction = currentTime
          }
        }

        return {
          ...statement,
          amount: formatAmount(Number(statement.amount)),
          updated_at: formatDate(new Date(statement.updated_at)),
        }
      })

      setHighlighData({
        deposits: {
          amount: formatAmount(deposits),
          lastTransaction: formatLastTransaction(
            new Date(depositLastTransaction),
          ),
        },
        withdraws: {
          amount: formatAmount(withdraws),
          lastTransaction: formatLastTransaction(
            new Date(withdrawLastTransaction),
          ),
        },
        balance: {
          amount: formatAmount(response.data.balance),
          lastTransaction: `01 a ${formatLastTransaction(
            new Date(Math.max(depositLastTransaction, withdrawLastTransaction)),
          )}`,
        },
      })
      setData(parsedResponse)
    } catch {
      Alert.alert('Erro ao buscar os dados')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useFocusEffect(() => {
    fetchData()
  })

  if (isLoading) {
    return (
      <LoaderContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoaderContainer>
    )
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/13942973?s=400&u=a50f1f964da40b7d7423d80de28520c593b7ed2f&v=4',
              }}
            />

            <User>
              <UserGretting>Olá, </UserGretting>
              <UserName>Leleo</UserName>
            </User>
          </UserInfo>

          <LogoutButton>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards horizontal>
        <HighlightCard type="up" title="Entradas" {...highlighData.deposits} />
        <HighlightCard type="down" title="Saídas" {...highlighData.withdraws} />
        <HighlightCard
          type="total"
          title="Entradas"
          {...highlighData.balance}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
