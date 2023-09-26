import { useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { ArtWorksList } from '../../shared/components/ArtWorksList';
import { useFavorites } from '../../../domain/useCases/useFavorites';
import { BackgroundView } from '../../shared/components/BackgroundView';
import { routes } from '../../navigation/routes';

export function Favorites({}) {
  const { navigate } = useNavigation();

  const {
    error: paginationError,
    onFavoriteChange,
    favorites,
    reload,
  } = useFavorites();

  useEffect(() => {
    reload();
  }, [useIsFocused()]);

  return (
    <BackgroundView>
      <ArtWorksList
        artWorks={favorites}
        onFavoritePress={onFavoriteChange}
        showLoader={false}
        onScrollEnds={() => {}}
        error={paginationError}
        animateOnRemove={true}
        onCardPress={() => navigate(routes.ArtWorkDetails as never)}
      />
    </BackgroundView>
  );
}
