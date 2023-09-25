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
        .catch((error: Error) => {
          if (this.isUnexistingValueError(error)) {
            return resolve([]);
          }
          reject(error)
        })
    })
  }

  save(artWork: ArtWork[]): Promise<ArtWork[]> {
    return new Promise((resolve, reject) => {
      this.localStorage.set<ArtWork[]>(this.storageKey, artWork)
        .then(data => {
          this.memoryList = data;
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

  existById(id: ArtWorkID): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getAll()
        .then(gotFavorites => resolve(this.existInFavoritesArray(gotFavorites, id)))
        .catch((error: Error) => {
          if (this.isUnexistingValueError(error)) {
            return resolve(false)
          }

          reject(error)
        })
    })
  }

  saveOne(artWork: ArtWork): Promise<ArtWork[]> {
    return new Promise((resolve, reject) => {
      this.getAll()
        .then(storedFavorites => {
          this.save(storedFavorites.concat(artWork))
            .then(stored => {
              this.memoryList = stored;
              resolve(stored)
            })
            .catch((error: Error) => reject(error))
        })
        .catch((error: Error) => reject(error))
    })
  }

  private isUnexistingValueError(error: Error): boolean {
    return error.message === "Value is null for 6827a85b76e967f6a129e08f9272e76d key"
  }

  private existInFavoritesArray(favoritesArray: ArtWork[], id: ArtWorkID): boolean {
    return favoritesArray.findIndex(favorite => favorite.id == id) !== -1
  }
}