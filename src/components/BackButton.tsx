import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import CaretLeft from '../../assets/Caret-left.svg';
export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <CaretLeft />
    </TouchableOpacity>
  );
};
