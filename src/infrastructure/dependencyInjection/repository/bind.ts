import { Container } from 'inversify';

import { ArtWorksRepository } from '../../../domain/repositories/artWorksRepository';
import { ArtWorksAdaptor } from '../../adaptors/artWorksAdaptor';
import { FavoritesRepository } from '../../../domain/repositories/favoritesRepository';
import { FavoritesAdaptor } from '../../adaptors/favoritesAdaptor';

export const bind = (container: Container) => {
  container.bind<ArtWorksRepository>('ArtWorksRepository').to(ArtWorksAdaptor);
  container
    .bind<FavoritesRepository>('FavoritesRepository')
    .to(FavoritesAdaptor);
};
