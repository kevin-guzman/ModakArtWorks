
import { DrawerContentComponentProps, createDrawerNavigator } from '@react-navigation/drawer';
import { ArtWorks } from "../views/ArtWorks/ArtWorks";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Favorites } from '../views/Favorites/Favorites';
import { BackgroundView } from '../shared/components/BackgroundView';


const Drawer = createDrawerNavigator();

const DrawerContent = ({ descriptors, navigation, state }: DrawerContentComponentProps) => {
  const { navigate,  reset} = navigation

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