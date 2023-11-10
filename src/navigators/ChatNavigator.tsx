import { createStackNavigator } from '@react-navigation/stack'

import { Routes, RootStackParamList } from './types'
import { TopHeader } from '../components/TopHeader'
import { Chat } from '../screens/Chat'
import { Rooms } from '../screens/Rooms'

const Stack = createStackNavigator<RootStackParamList>()

export const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: TopHeader,
      }}>
      <Stack.Screen name={Routes.ROOMS} component={Rooms} />
      <Stack.Screen name={Routes.CHAT} component={Chat} />
    </Stack.Navigator>
  )
}
