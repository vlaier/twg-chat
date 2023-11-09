import { createStackNavigator } from '@react-navigation/stack'

import { Routes } from './types'
import { TopHeader } from '../components/TopHeader'
import { Rooms } from '../screens/Rooms'

const Stack = createStackNavigator()

export const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: TopHeader,
      }}>
      <Stack.Screen name={Routes.ROOMS} component={Rooms} />
    </Stack.Navigator>
  )
}
