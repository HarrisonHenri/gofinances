import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Input } from '.'
import theme from '../../../global/styles/theme'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('Input component', () => {
  it('should have specific border when active', () => {
    const { getByTestId } = render(<Input testID="any" active />, {
      wrapper: Providers,
    })

    const component = getByTestId('any')
    expect(component.props.style[0].borderColor).toEqual(theme.colors.attention)
    expect(component.props.style[0].borderWidth).toEqual(3)
  })
})
