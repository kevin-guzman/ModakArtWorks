import { ArtWork } from "../entities/artWork";
import { ArtWorkID } from "../entities/artWorkId";

export interface FavoritesRepository {
  getAll(): Promise<ArtWork[]>
  save(artWork: ArtWork[]): Promise<ArtWork[]>
  deleteById(artWorkId: ArtWorkID): Promise<ArtWork[]>
  clearAll(): Promise<void>
}