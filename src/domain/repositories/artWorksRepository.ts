import { ArtWork, DetailedArtwork } from '../entities/artWork';
import { ArtWorkID } from '../entities/artWorkId';
import { Pagination } from '../shared/types/pagination';

export interface ArtWorksRepository {
  getPaginated(pagination: Pagination): Promise<ArtWork[]>;
  getDetails(id: ArtWorkID): Promise<DetailedArtwork>;
}
