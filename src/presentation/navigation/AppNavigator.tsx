
import { DrawerContentComponentProps, createDrawerNavigator } from '@react-navigation/drawer';
import { ArtWorks } from "../views/ArtWorks/ArtWorks";
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Favorites } from '../views/Favorites/Favorites';
import { BackgroundView } from '../shared/components/BackgroundView';


const Drawer = createDrawerNavigator();

const Header = () => {
  const { dispatch } = useNavigation()
  return <View style={{
    backgroundColor: "transparent",
    width: "100%",
    height: 50,
    position: "absolute",
    padding: 10,
    flexDirection: 'row'

  }} >
    <Icon name='menu' color={"white"} onPress={() => dispatch(DrawerActions.openDrawer())} size={30} />
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }} >
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: "white" }} >____Gallery____</Text>

    </View>
  </View>
}

const DrawerContent = ({ descriptors, navigation: { navigate }, state }: DrawerContentComponentProps) => {
  const { routeNames } = state
  // console.log("id", { ...state.routeNames });

  return (
    <BackgroundView style={{ justifyContent: 'center', alignItems: 'center' }} >
      <TouchableOpacity onPress={() => {
        navigate("Favorites")
      }}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ color: 'white' }} >Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigate("ArtWorks")
      }} >
        <Text style={{ color: 'white' }} >List</Text>
      </TouchableOpacity>
    </BackgroundView>
  )
}

export const AppNavigator = ({ }) => {
  return (
    <NavigationContainer>
      <SafeAreaView />
      <Drawer.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTitle: ({ }) => null, //<Text style={{color:'white'}} >effrh</Text>,
          headerTintColor: "white",
        }}
        drawerContent={DrawerContent}
        initialRouteName="ArtWorks"
      >
        <Drawer.Screen
          name="ArtWorks"
          component={ArtWorks}
        />
        <Drawer.Screen
          name='Favorites'
          component={Favorites}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}