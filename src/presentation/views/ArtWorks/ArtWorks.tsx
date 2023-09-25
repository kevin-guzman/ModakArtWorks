import { ActivityIndicator, Button, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { useState } from "react";
import { ArtWork } from "../../../domain/entities/artWork";
import { ApplicationError } from "../../../domain/entities/applicationError";
import { ArtWorkCard } from "../../shared/components/ArtWorkCard";
import { useFavoritesAndArtWorks } from "../../../domain/useCases/useFavoritesAndArtWorks";

export function ArtWorks({ }) {
  const {
    artWorks,
    onScrollEnds,
    isLoading,
    error: paginationError,
    favorites,
    onFavoriteChange
  } = useFavoritesAndArtWorks({ limit: 15, page: 1 });

  const [re, setRe] = useState(false)
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ImageBackground style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} source={require('../../../../bg.jpeg')} >
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} >
          <Button title="Switch" onPress={() => setRe(!re)} />
          {!re ?
            <ArtWorksList
              artWorks={artWorks}
              onElementClick={onFavoriteChange}
              isLoadingContent={isLoading}
              onScrollEnds={onScrollEnds}
              error={paginationError}

            />
            :
            <ScrollView>
              {favorites && favorites?.map((art) => (
                <TouchableOpacity key={art.id} onPress={() => onFavoriteChange(art)} >
                  <Text style={{ marginBottom: 10 }} >FAVORITE ---- {art.title}</Text>
                  <Image
                    source={{ uri: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg` }}
                    width={300}
                    height={300} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          }

        </View>
      </ImageBackground>

    </SafeAreaView>
  )
}

type ArtWorksListProps = {
  artWorks: ArtWork[]
  onElementClick: (element: ArtWork) => Promise<void>;
  onScrollEnds: () => void;
  isLoadingContent: boolean;
  error: ApplicationError;
}
const ArtWorksList = ({ artWorks, onElementClick, onScrollEnds, isLoadingContent, error }: ArtWorksListProps) => {
  const renderFooter = () => {
    return (
      <View>
        {error.hasError ?
          <Text style={{ color: "white", textAlign: "center", fontSize: 20, marginVertical: 20 }} >{error.message}</Text>
          : <ActivityIndicator style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 40
          }} size={"large"} />}
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
      onEndReachedThreshold={10}
      onEndReached={() => onScrollEnds()}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ marginTop: 5 }} />}
    />
  )
}