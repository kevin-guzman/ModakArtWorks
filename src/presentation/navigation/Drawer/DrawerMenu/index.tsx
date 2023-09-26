import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDrawerPurpose } from '../../context/useDrawerIconPurpose';

export const DrawerMenu = ({ navigation }: any) => {
  const { purpose } = useDrawerPurpose();
  const actions = {
    toggle: () => navigation.toggleDrawer(),
    back: () => {
      navigation.canGoBack() && navigation.goBack();
    },
  };
  const icons = {
    toggle: (
      <MaterialCommunityIcons
        size={30}
        name="menu"
        color={'white'}
        testID="drawer-menu"
      />
    ),
    back: (
      <Ionicons
        name="arrow-back-outline"
        color={'white'}
        testID="back-menu"
        size={30}
      />
    ),
  };
  const onIconPress = () => {
    const action = actions[purpose];
    action();
  };
  return (
    <TouchableOpacity style={styes.container} onPress={onIconPress}>
      {/* <Icon size={30} name="menu" color={'white'} testID="drawer-menu" /> */}
      {icons[purpose]}
    </TouchableOpacity>
  );
};

const styes = StyleSheet.create({
  container: { marginLeft: 5 },
});
