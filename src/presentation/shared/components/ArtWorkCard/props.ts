import { ArtWork } from '../../../../domain/entities/artWork';

export type Props = {
  addToFavoritesHandler: (element: ArtWork) => Promise<void> | void;
  artWork: ArtWork;
  index?: number;
  testID: string;
  animateOnRemove?: boolean;
  onCardPress: (element: ArtWork) => void;
};
