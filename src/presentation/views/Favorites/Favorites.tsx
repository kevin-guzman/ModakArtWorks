import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { ArtWorksList } from "../../shared/components/ArtWorksList";
import { useFavorites } from "../../../domain/useCases/useFavorites";
import { BackgroundView } from "../../shared/components/BackgroundView";

export function Favorites({ }) {
  const {
    error: paginationError,
    onFavoriteChange,
    favorites,
    reload
  } = useFavorites();

  useEffect(() => {
    reload();
  }, [useIsFocused()])

  // useEffect(()=>{
  //   console.log(" in favs view", favorites.length);
    
  // }, [favorites])

  return (
    <BackgroundView>
      <ArtWorksList
        artWorks={favorites}
        onElementClick={onFavoriteChange}
        showLoader={false}
        onScrollEnds={() => { }}
        error={paginationError}
      />
    </BackgroundView >
  )
}
