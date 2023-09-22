import { useCallback, useEffect, useMemo, useState } from "react"
import { ArtWork } from "../entities/artWork"
import { FavoritesRepository } from "../repositories/favoritesRepository";
import { useInjection } from "inversify-react";
import { ArtWorkID } from "../entities/artWorkId";

export const useFavorites = () => {
  const favoritesRepository = useInjection<FavoritesRepository>("FavoritesRepository");

  const [favorites, setFavorites] = useState<ArtWork[]>([])
  const [loadingFavoriteId, setLoadingFavoriteId] = useState<ArtWorkID | null>(null)

  const onFavoriteChange = useCallback(async (element: ArtWork) => {
    setLoadingFavoriteId(element.id)

    const isAlreadyInFavorites = favorites.findIndex(favorite => favorite.id == element.id) !== -1

    if (isAlreadyInFavorites) {
      const updatedFavorites = await favoritesRepository.deleteById(element.id)
      setFavorites(updatedFavorites)
      setLoadingFavoriteId(null)
      return
    }

    const savedFavorite = await favoritesRepository.save([...new Set(favorites.concat(element))])
    setFavorites(savedFavorite)
    setLoadingFavoriteId(null)

  }, [favorites])

  useEffect(() => {
    favoritesRepository.getAll()
      .then((favorites) => { setFavorites(favorites) })
      // TODO: handle this error
      .catch(console.log)
  }, [])

  return { onFavoriteChange, favorites, loadingFavoriteId }
}