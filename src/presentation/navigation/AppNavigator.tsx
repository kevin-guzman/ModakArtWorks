
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ArtWorks } from "../views/ArtWorks/ArtWorks";
import { Favorites } from '../views/Favorites/Favorites';
import { routes, routesTitles } from './routes';
import { ArtWorkDetails } from '../views/ArtWorkDetails';
import { DrawerMenu } from './Drawer/DrawerMenu';
import { DrawerContent } from './Drawer/DrawerContent';
import { applicationScreensList } from './applicationScreensList';

const Drawer = createDrawerNavigator();
export const AppNavigator = ({ }) => {
  return (
    <NavigationContainer>
      <SafeAreaView />
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTitle: ({ }) => <Text style={{ color: 'white', fontStyle: 'italic' }} >{routesTitles.ArtWorks}</Text>,
          headerTintColor: "white",
          headerLeft: ({ }) => <DrawerMenu navigation={navigation} />,
        })}
        drawerContent={DrawerContent}
        initialRouteName={routes.ArtWorksList}
      >
        <Drawer.Screen
          name={routes.ArtWorksList}
          component={ArtWorks}
        />
        <Drawer.Screen
          name={routes.Favorites}
          component={Favorites}
        />
        <Drawer.Screen
          name={routes.ArtWorkDetails}
          component={ArtWorkDetails}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}