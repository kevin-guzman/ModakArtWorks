import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/paramsList';
import { BackgroundView } from '../../shared/components/BackgroundView';

export function ArtWorkDetails({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ArtWorkDetails'>) {
  const { description } = route.params.artWork;

  return (
    <BackgroundView>
      <Text>{description}</Text>
    </BackgroundView>
  );
}
