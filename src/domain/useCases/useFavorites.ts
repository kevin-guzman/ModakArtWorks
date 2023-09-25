import { useCallback, useEffect, useMemo, useState } from "react"
import { ArtWork } from "../entities/artWork"
import { FavoritesRepository } from "../repositories/favoritesRepository";
import { useInjection } from "inversify-react";
import { useApplicationError } from "../shared/hooks/useApplicationError";

export const constants = {
  FETCHING_ERROR: "Error has occured getting favorites",
  UNEXISTING_FAVORITE_INDEX: -1
}

export const useFavorites = () => {
  const favoritesRepository = useInjection<FavoritesRepository>("FavoritesRepository");

  const [favorites, setFavorites] = useState<ArtWork[]>([])
  const { error, setMessageFromError, setNoError } = useApplicationError();

  const onFavoriteChange = useCallback(async (element: ArtWork) => {
    const isAlreadyInFavorites = favorites.findIndex(favorite => favorite.id == element.id) !== constants.UNEXISTING_FAVORITE_INDEX

    if (isAlreadyInFavorites) {
      const updatedFavorites = await favoritesRepository.deleteById(element.id)
      setFavorites(updatedFavorites)
      return
    }

    const savedFavorite = await favoritesRepository.save([...new Set(favorites.concat({ ...element, is_favorite: true }))])
    setFavorites(savedFavorite)

  }, [favorites])
  const getFavorites = useCallback(() => {
    favoritesRepository.getAll()
      .then((favorites) => {
        setFavorites(favorites);
        setNoError();
      })
      .catch(error => {
        setMessageFromError(error);
      })
  }, [])
  const reload = () => {
    getFavorites();
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return {
    onFavoriteChange,
    favorites,
    error,
    reload
  }
}