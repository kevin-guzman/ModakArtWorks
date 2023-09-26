import { routes } from './routes';
import { ArtWorksList } from '../shared/components/ArtWorksList';
import { ArtWorkDetails } from '../views/ArtWorkDetails';
import { Favorites } from '../views/Favorites/Favorites';

export type ApplicationScreen = {
  name: string;
  component: React.FC<any>;
};

export const applicationScreensList: ApplicationScreen[] = [
  {
    name: routes.ArtWorksList,
    component: ArtWorksList,
  },
  {
    name: routes.Favorites,
    component: Favorites,
  },
  {
    name: routes.ArtWorkDetails,
    component: ArtWorkDetails,
  },
];
