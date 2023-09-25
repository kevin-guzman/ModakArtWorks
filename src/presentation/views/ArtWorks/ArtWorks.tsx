import { useEffect } from "react";

import { useFavoritesAndArtWorks } from "../../../domain/useCases/useFavoritesAndArtWorks";
import { ArtWorksList } from "../../shared/components/ArtWorksList";
import { useIsFocused } from "@react-navigation/native";
import { BackgroundView } from "../../shared/components/BackgroundView";

export function ArtWorks({ }) {
  const {
    artWorks,
    onScrollEnds,
    isLoading,
    error: paginationError,
    onFavoriteChange,
    reload
  } = useFavoritesAndArtWorks({ limit: 15, page: 1 });

  // TODO: reload is_favorite state comming from favorites
  useEffect(() => {
    reload();
  }, [useIsFocused()])

  return (
    <BackgroundView>
      <ArtWorksList
        artWorks={artWorks}
        onElementClick={onFavoriteChange}
        showLoader={isLoading}
        onScrollEnds={onScrollEnds}
        error={paginationError}
      />
    </BackgroundView>
  )
}
