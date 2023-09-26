import { routes } from '../../routes';

export type contentElement = {
  title: string;
  navigation: string;
};

export const contentList: contentElement[] = [
  {
    title: 'Favorites',
    navigation: routes.Favorites,
  },
  {
    title: 'Gallery',
    navigation: routes.ArtWorksList,
  },
];
