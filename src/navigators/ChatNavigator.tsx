import { createStackNavigator } from '@react-navigation/stack';

import { Rooms } from '../screens/Rooms';
import { TopHeader } from '../components/TopHeader';
import { Routes } from './types';

const Stack = createStackNavigator();

export const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: TopHeader,
      }}>
      <Stack.Screen name={Routes.ROOMS} component={Rooms} />
    </Stack.Navigator>
  );
};
