import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
// eslint-disable-next-line
import { fireEvent, render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Register } from '.'
import theme from '../../global/styles/theme'

jest.mock('react-native-gesture-handler', () => {
  // eslint-disable-next-line
  const View = require('react-native/Libraries/Components/View/View')
  return {
    Swipeable: View,
    GestureHandlerRootView: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  }
})

const Providers: React.FC = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </NavigationContainer>
)

describe('Register screen', () => {
  it('should open the category modal when the user click on category btn', () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    })

    const categoryBtn = getByTestId('category-btn')
    const modal = getByTestId('modal-category')
    expect(modal.props.visible).toBeFalsy()

    fireEvent.press(categoryBtn)
    expect(modal.props.visible).toBeTruthy()
  })
})
