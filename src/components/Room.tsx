import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

type RoomProps = {
  name: string;
  id: string;
  messages: string[];
};
export const Room = (props: RoomProps) => {
  return <View style={styles.room} />;
};
const styles = StyleSheet.create({
  room: {
    width: '100%',
    height: 88,
    backgroundColor: colors.plum,
    borderRadius: 12,
  },
});
