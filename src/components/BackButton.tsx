import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';

import CaretLeft from '../../assets/Caret-left.svg';
export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <CaretLeft />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderWidth: 1,
    color: 'black',
  },
});
