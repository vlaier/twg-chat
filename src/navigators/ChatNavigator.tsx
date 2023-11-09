import { createStackNavigator } from '@react-navigation/stack';

import { Rooms } from '../screens/Rooms';

const Stack = createStackNavigator();

export const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms" component={Rooms} />
    </Stack.Navigator>
  );
};
