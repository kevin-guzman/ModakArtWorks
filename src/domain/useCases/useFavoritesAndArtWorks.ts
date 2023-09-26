import { useCallback, useEffect, useState } from 'react';
import { Pagination } from '../shared/types/pagination';
import { useFavorites, constants } from './useFavorites';
import { usePaginateArtWorks } from './usePaginateArtWorks';
import { ArtWork } from '../entities/artWork';

export const useFavoritesAndArtWorks = (initialPagination: Pagination) => {
  const { favorites, reload: reloadFavorites } = useFavorites();
  const {
    artWorks: gotArtWorks,
    error,
    isLoading,
    onScrollEnds,
  } = usePaginateArtWorks(initialPagination);

  const [artWorks, setArtWorks] = useState<ArtWork[]>([]);

  const mergeFavoritesWithArtWorks = useCallback(() => {
    const merged: ArtWork[] = gotArtWorks.map(artWork => {
      const { id } = artWork;
      const isInFavorites =
        favorites.findIndex(fav => fav.id == id) !==
        constants.UNEXISTING_FAVORITE_INDEX;

      if (isInFavorites) {
        return { ...artWork, is_favorite: true };
      }

      return { ...artWork, is_favorite: false };
    });

    setArtWorks(() => [...merged]);
  }, [favorites, gotArtWorks]);

  useEffect(() => {
    mergeFavoritesWithArtWorks();
  }, [gotArtWorks, favorites]);

  const reload = useCallback(() => {
    reloadFavorites();
  }, []);

  return {
    artWorks,
    error,
    isLoading,
    onScrollEnds,
    reload,
  };
};
