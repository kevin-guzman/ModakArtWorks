import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { useFavoritesAndArtWorks } from "../../../domain/useCases/useFavoritesAndArtWorks";
import { ArtWorksList } from "../../shared/components/ArtWorksList";
import { BackgroundView } from "../../shared/components/BackgroundView";
import { useFavorites } from "../../../domain/useCases/useFavorites";

export function ArtWorks({ }) {
  const initialPagination = { limit: 30, page: 1 };
  const {
    artWorks,
    onScrollEnds,
    error: paginationError,
    reload
  } = useFavoritesAndArtWorks(initialPagination);
  const { onFavoriteChange } = useFavorites()

  useEffect(() => {
    reload()
  }, [useIsFocused()])

  return (
    <BackgroundView>
      <ArtWorksList
        artWorks={artWorks}
        onElementClick={onFavoriteChange}
        showLoader={true}
        onScrollEnds={onScrollEnds}
        error={paginationError}
      />
    </BackgroundView>
  )
}
