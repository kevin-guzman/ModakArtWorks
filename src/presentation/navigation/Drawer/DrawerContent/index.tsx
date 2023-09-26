import { Text, TouchableOpacity } from "react-native"
import { DrawerContentComponentProps } from "@react-navigation/drawer"

import { BackgroundView } from "../../../shared/components/BackgroundView"
import { contentElement, contentList } from "./contentList"
import { styles } from "./styles"

export const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { navigate } = navigation;

  const renderItem = (item: contentElement) => (
    <TouchableOpacity
      onPress={() => navigate(item.navigation)}
      style={styles.itemContainer}
    >
      <Text style={styles.itemTitle} >{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <BackgroundView style={styles.container} >
      {contentList.map(renderItem)}
    </BackgroundView>
  )
}