import { ArtWork } from "../entities/artWork";
import { Pagination } from "../shared/types/pagination";

export interface ArtWorksRepository {
  getPaginated(pagination: Pagination): Promise<ArtWork[]>;
}