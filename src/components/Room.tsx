import { View, StyleSheet, Text } from 'react-native';

import { useRoom } from '../hooks/useRoom';
import { colors } from '../styles/colors';

type RoomProps = {
  id: string;
};
export const Room = (props: RoomProps) => {
  const room = useRoom(props.id);
  return (
    <View style={styles.room}>
      <Text>{room?.data?.room?.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  room: {
    width: '100%',
    height: 88,
    backgroundColor: colors.plum,
    borderRadius: 12,
  },
});
