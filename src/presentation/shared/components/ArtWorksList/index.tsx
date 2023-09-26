import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { ArtWorkCard } from "../ArtWorkCard";
import { Props } from "./props";
import { styles } from "./styles";

export const ArtWorksList = ({
  artWorks,
  onFavoritePress,
  onScrollEnds,
  error,
  showLoader,
  animateOnRemove,
  onCardPress
}: Props) => {

  const renderFooter = () => {
    return (
      <View testID="art-works-list-footer" >
        {error.hasError ?
          <Text  testID="art-works-list-footer[text]" style={styles.errorText} >{error.message}</Text>
          : showLoader && <ActivityIndicator  testID="art-works-list-footer[loader]" style={styles.loader} size={"large"} />}
      </View>
    )
  }

  return (
    <FlatList
      testID="art-works-list"
      data={artWorks}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: art, index }) => (
        <ArtWorkCard
          testID="art-work-card"
          addToFavoritesHandler={onFavoritePress}
          artWork={art}
          index={index}
          animateOnRemove={animateOnRemove}
          onCardPress={onCardPress}
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