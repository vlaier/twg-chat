import { Text, StyleSheet, View } from 'react-native';

import { Room } from '../components/Room';
import { useRooms } from '../hooks/useRooms';
export const Rooms = () => {
  const { data, loading } = useRooms();
  if (loading) return <Text>Loading...</Text>;
  const ids = data?.usersRooms.rooms.map(room => room.id);
  console.log('IDS', ids);

  return (
    <View style={styles.container}>
      <Text>Rooms</Text>
      <Room />
      <View />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
