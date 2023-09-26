import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const DrawerMenu = ({ navigation }: any) => {
  return (
    <TouchableOpacity style={styes.container} onPress={() => navigation.toggleDrawer()}>
      <Icon size={30} name='menu' color={"white"} testID='drawer-menu' />
    </TouchableOpacity>
  )
}

const styes = StyleSheet.create({
  container:{ marginLeft: 5 },
})