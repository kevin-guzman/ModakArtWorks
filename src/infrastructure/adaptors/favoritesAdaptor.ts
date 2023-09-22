import { inject, injectable } from "inversify";
import { ArtWork } from "../../domain/entities/artWork";
import { ArtWorkID } from "../../domain/entities/artWorkId";
import { FavoritesRepository } from "../../domain/repositories/favoritesRepository";
import { LocalStorageManager } from "../storage/local";
import { KEYS } from "../config/api/keys";

@injectable()
export class FavoritesAdaptor implements FavoritesRepository {
  @inject("LocalStorageManager")
  private localStorage!: LocalStorageManager;
  private storageKey = KEYS.localStorage.favorites;
  private memoryList: ArtWork[] = [];
  constructor() { }

  getAll(): Promise<ArtWork[]> {
    return new Promise((resolve, reject) => {
      this.localStorage.get<ArtWork[]>(this.storageKey)
        .then(data => {
          this.memoryList = data;
          resolve(data)
        })
        .catch(error => reject(error))
    })
  }

  save(artWork: ArtWork[]): Promise<ArtWork[]> {
    return new Promise((resolve, reject) => {
      this.localStorage.set<ArtWork[]>(this.storageKey, artWork)
        .then(data => {
          this.memoryList = artWork;
          resolve(data)
        })
        .catch(error => reject(error))
    })
  }

  deleteById(artWorkId: ArtWorkID): Promise<ArtWork[]> {
    const filteredArtWorks = this.memoryList.filter(artWork => artWork.id != artWorkId)

    return new Promise((resolve, reject) => {
      this.save(filteredArtWorks)
        .then((storedArtWorks) => {
          this.memoryList = storedArtWorks;
          resolve(storedArtWorks)
        })
        .catch(error => reject(error))
    })
  }

  clearAll(): Promise<void> {
    return this.localStorage.clear()
  }
}