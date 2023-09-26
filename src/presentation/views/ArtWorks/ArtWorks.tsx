import { useEffect } from "react";
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";

import { useFavoritesAndArtWorks } from "../../../domain/useCases/useFavoritesAndArtWorks";
import { ArtWorksList } from "../../shared/components/ArtWorksList";
import { BackgroundView } from "../../shared/components/BackgroundView";
import { useFavorites } from "../../../domain/useCases/useFavorites";
import { routes } from "../../navigation/routes";

type props = {
  navigation:NavigationProp<ParamListBase>
}
export function ArtWorks({ navigation}:props) {
  const initialPagination = { limit: 30, page: 1 };
  const n = useNavigation();
  const {
    artWorks,
    onScrollEnds,
    error: paginationError,
    reload
  } = useFavoritesAndArtWorks(initialPagination);
  const { onFavoriteChange } = useFavorites();

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
        onCardPress={()=> n.navigate(routes.ArtWorkDetails as never)}
      />
    </BackgroundView>
  )
}
