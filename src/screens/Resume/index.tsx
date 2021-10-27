import React, { useCallback, useState } from 'react'
import { Alert, ActivityIndicator } from 'react-native'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { addMonths, format, subMonths } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR/index.js'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'
import { VictoryPie } from 'victory-native'

import { HistoryCard } from '../../components/HistoryCard'
import { StatementDTO } from '../../dtos/StatementDTO'
import { api } from '../../services/api'
import { formatAmount } from '../../utils/formatAmount'
import { formatResume, resumeMap } from '../../utils/formatResume'
import {
  ChartContainer,
  Container,
  Content,
  Header,
  LoaderContainer,
  Title,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
} from './styles'

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState(resumeMap)
  const [isLoading, setIsLoading] = useState(true)

  const theme = useTheme()
  const contentPadding = useBottomTabBarHeight()

  const handleDateChange = useCallback(
    (action: 'next' | 'prev') => {
      let newDate = selectedDate
      if (action === 'next') {
        newDate = addMonths(newDate, 1)
      } else {
        newDate = subMonths(newDate, 1)
      }

      setSelectedDate(newDate)
    },
    [selectedDate],
  )

  const fetchData = useCallback(async () => {
    try {
      const uri = '/api/v1/statements/balance'
      const response = await api.get<{
        statement: StatementDTO[]
        balance: number
      }>(uri)

      const filteredData = response.data.statement.filter(
        item =>
          new Date(item.updated_at).getMonth() === selectedDate.getMonth() &&
          new Date(item.updated_at).getFullYear() ===
            selectedDate.getFullYear(),
      )

      const parsedResume = formatResume(filteredData)

      setData(parsedResume)
    } catch {
      Alert.alert('Erro ao buscar os dados')
    } finally {
      setIsLoading(false)
    }
  }, [selectedDate])

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

  const graphData = Object.values(data)
    .filter(expensive => expensive.percent > 0)
    .map(expensive => ({ ...expensive, percent: `${expensive.percent}%` }))

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: contentPadding,
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <SelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>
            {format(selectedDate, 'MMMM, yyyy', {
              locale: ptBR,
            })}
          </Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <SelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={graphData}
            colorScale={graphData.map(item => item.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
            x="percent"
            y="percent"
          />
        </ChartContainer>

        {Object.keys(data).map(key => {
          const item = data[key as keyof typeof resumeMap]

          return (
            item.amount > 0 && (
              <HistoryCard
                key={key}
                amount={formatAmount(item.amount)}
                color={item.color}
                name={item.name}
              />
            )
          )
        })}
      </Content>
    </Container>
  )
}
