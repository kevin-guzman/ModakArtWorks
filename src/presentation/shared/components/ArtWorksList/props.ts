import { ApplicationError } from '../../../../domain/entities/applicationError';
import { ArtWork } from '../../../../domain/entities/artWork';

export type Props = {
  artWorks: ArtWork[];
  onFavoritePress: (element: ArtWork) => Promise<void> | void;
  onScrollEnds: () => void;
  showLoader: boolean;
  error: ApplicationError;
  animateOnRemove?: boolean;
  onCardPress: (element: ArtWork) => void;
};
