import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.secondary};

  width: 100%;
  height: 30%;
  padding: 0 32px;
`
