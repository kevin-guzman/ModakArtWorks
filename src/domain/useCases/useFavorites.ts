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

  const onFavoriteChange = useCallback( (element: ArtWork) => {
    favoritesRepository.existById(element.id.toString())
    .then(async(alreadyExistInFavorites) => {
      if (alreadyExistInFavorites){
        const updatedFavorites = await favoritesRepository.deleteById(element.id)
        return setFavorites(()=>updatedFavorites)
      }
      const storedFavorites = await favoritesRepository.saveOne({ ...element, is_favorite: true })
      setFavorites(()=>storedFavorites)
    })
    .catch((error)=>setMessageFromError(error))

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
    reload,
  }
}