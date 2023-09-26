import { useEffect } from 'react';
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import { useFavoritesAndArtWorks } from '../../../domain/useCases/useFavoritesAndArtWorks';
import { ArtWorksList } from '../../shared/components/ArtWorksList';
import { BackgroundView } from '../../shared/components/BackgroundView';
import { useFavorites } from '../../../domain/useCases/useFavorites';
import { routes } from '../../navigation/routes';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/paramsList';

type props = {
  navigation: NavigationProp<ParamListBase>;
};
export function ArtWorks({ navigation }: props) {
  const initialPagination = { limit: 30, page: 1 };
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'ArtWorks'>>();
  const {
    artWorks,
    onScrollEnds,
    error: paginationError,
    reload,
  } = useFavoritesAndArtWorks(initialPagination);
  const { onFavoriteChange } = useFavorites();

  useEffect(() => {
    reload();
  }, [useIsFocused()]);

  return (
    <BackgroundView>
      <ArtWorksList
        artWorks={artWorks}
        onFavoritePress={onFavoriteChange}
        showLoader={true}
        onScrollEnds={onScrollEnds}
        error={paginationError}
        onCardPress={artWork => {
          navigate(
            // @ts-ignore
            routes.ArtWorkDetails as never,
            { artWork },
          );
        }}
      />
    </BackgroundView>
  );
}
