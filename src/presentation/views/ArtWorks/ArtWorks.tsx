import { Image, SafeAreaView, ScrollView, StatusBar, Text, View, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { usePaginateArtWorks } from "../../../domain/useCases/usePaginateArtWorks";

export function ArtWorks({ }) {
  const { artWorks: arts, onScrollEnds } = usePaginateArtWorks({ limit: 15, page: 1 });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        onMomentumScrollEnd={() => onScrollEnds()}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {arts && arts.map(({ title, id, image_id }) => (
          <View key={id} >
            <Text style={{ marginBottom: 10 }} >{title}</Text>
            <Image
              source={{ uri: `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg` }}
              width={300}
              height={300} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}