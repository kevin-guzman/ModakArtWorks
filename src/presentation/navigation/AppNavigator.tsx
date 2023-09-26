import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ArtWorks } from '../views/ArtWorks/ArtWorks';
import { Favorites } from '../views/Favorites/Favorites';
import { routes, routesTitles } from './routes';
import { ArtWorkDetails } from '../views/ArtWorkDetails';
import { DrawerMenu } from './Drawer/DrawerMenu';
import { DrawerContent } from './Drawer/DrawerContent';
import { RootStackParamList } from './paramsList';

const Drawer = createDrawerNavigator<RootStackParamList>();
export const AppNavigator = ({}) => {
  return (
    <NavigationContainer>
      <SafeAreaView />
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTitle: ({}) => {
            const { name } = useRoute();
            return (
              <Text style={{ color: 'white', fontStyle: 'italic' }}>
                {routesTitles[name as routes]}
              </Text>
            );
          },
          headerTintColor: 'white',
          headerLeft: ({}) => <DrawerMenu navigation={navigation} />,
        })}
        drawerContent={DrawerContent}
        initialRouteName={routes.ArtWorksList}>
        <Drawer.Screen name={routes.ArtWorksList} component={ArtWorks} />
        <Drawer.Screen name={routes.Favorites} component={Favorites} />
        <Drawer.Screen
          name={routes.ArtWorkDetails}
          component={ArtWorkDetails}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
