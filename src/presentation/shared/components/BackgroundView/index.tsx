import { ImageBackground, SafeAreaView, View, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Props } from './props'
import { styles } from "./styles";

export const BackgroundView = ({ children, style }: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ImageBackground style={styles.image} source={require('../../../../../bg.jpeg')} >
        <View style={{...styles.container, ...style}} >
          {children}
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}