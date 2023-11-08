import { Text } from 'react-native';

import { useRooms } from '../hooks/useRooms';
export const Rooms = () => {
  const { data, loading, error } = useRooms();
  !error && !loading && console.log(data);
  error && console.log(error);
  console.log('rooms', data?.rooms);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;
  return <Text>ROOMS</Text>;
};
