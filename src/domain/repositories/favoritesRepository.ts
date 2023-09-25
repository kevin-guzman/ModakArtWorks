import { ArtWork } from "../entities/artWork";
import { ArtWorkID } from "../entities/artWorkId";

export interface FavoritesRepository {
  getAll(): Promise<ArtWork[]>
  save(artWorks: ArtWork[]): Promise<ArtWork[]>
  deleteById(artWorkId: ArtWorkID): Promise<ArtWork[]>
  clearAll(): Promise<void>
  existById(id: ArtWorkID): Promise<boolean>
  saveOne(artWork: ArtWork): Promise<ArtWork[]>
}