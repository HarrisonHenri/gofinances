import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 100%;
  border-radius: 5px;
  align-items: center;
  padding: 18px;

  background-color: ${({ theme }) => theme.colors.secondary};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.shape};
`
