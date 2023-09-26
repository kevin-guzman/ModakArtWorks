import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/paramsList';
import { BackgroundView } from '../../shared/components/BackgroundView';
import { useGetArtWorkDetail } from '../../../domain/useCases/useGetArtWorkDetails';

export function ArtWorkDetails({
  route,
}: NativeStackScreenProps<RootStackParamList, 'ArtWorkDetails'>) {
  const { description, id } = route.params.artWork;
  const { details, error, onReload } = useGetArtWorkDetail(id);

  return (
    <BackgroundView>
      <Text>{description}</Text>
    </BackgroundView>
  );
}
