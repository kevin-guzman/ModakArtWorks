import { useEffect, useState } from "react";
import { Pagination } from "../shared/types/pagination";
import { useFavorites, constants } from "./useFavorites"
import { usePaginateArtWorks } from "./usePaginateArtWorks"
import { ArtWork } from "../entities/artWork";

export const useFavoritesAndArtWorks = (initialPagination: Pagination) => {
  const { favorites, onFavoriteChange } = useFavorites()
  const { artWorks: gotArtWorks, error, isLoading, onScrollEnds } = usePaginateArtWorks(initialPagination)

  const [artWorks, setArtWorks] = useState<ArtWork[]>([]);

  const mergeFavoritesWithArtWorks = () => {
    const merged: ArtWork[] = gotArtWorks.map((artWork) => {
      const { id } = artWork
      const isInFavorites = favorites.findIndex((fav) => fav.id == id) !== constants.UNEXISTING_FAVORITE_INDEX

      if (isInFavorites) {
        return { ...artWork, is_favorite: true };
      }

      return artWork;
    });

    setArtWorks(merged)
  }

  useEffect(() => {
    const favoritesAreEmpty = favorites && favorites.length === 0
    if (favoritesAreEmpty) {
      return setArtWorks(gotArtWorks);
    }

    mergeFavoritesWithArtWorks();
  }, [favorites, gotArtWorks])

  return {
    artWorks,
    error,
    onFavoriteChange,
    isLoading,
    onScrollEnds,
    favorites, // TODO remove
  }
}