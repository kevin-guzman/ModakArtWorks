import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/paramsList';

export function ArtWorkDetails({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ArtWorkDetails'>) {
  console.log(route.params);

  return <Text>Hola mundooooooooooooooo</Text>;
}
