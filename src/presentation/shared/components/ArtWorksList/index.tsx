import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { ArtWorkCard } from "../ArtWorkCard";
import { Props } from "./props";
import { styles } from "./styles";

export const ArtWorksList = ({
  artWorks,
  onElementClick,
  onScrollEnds,
  error,
  showLoader,
}: Props) => {

  const renderFooter = () => {
    return (
      <View>
        {error.hasError ?
          <Text style={styles.errorText} >{error.message}</Text>
          : showLoader && <ActivityIndicator style={styles.loader} size={"large"} />}
      </View>
    )
  }

  return (
    <FlatList
      data={artWorks}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: art }) => (
        <ArtWorkCard
          addToFavoritesHandler={onElementClick}
          artWork={art}
        />
      )}
      onEndReachedThreshold={0.5}
      onEndReached={() => onScrollEnds()}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}