import { Text } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from "../../navigation/paramsList";

export function ArtWorkDetails({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'ArtWorkDetails'>) {
  // route.params.artWork
  console.log(route.params);
  
  return (<Text>Hola mundooooooooooooooo</Text>)
}