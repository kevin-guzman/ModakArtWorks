import { injectable } from 'inversify';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocalStorageManager {
  get<T>(key: string): Promise<T>;
  set<T>(key: string, value: T): Promise<T>;
  delete<T>(key: string): Promise<void>;
  clear(): Promise<void>;
}

@injectable()
export class RNLocalStorageManager implements LocalStorageManager {
  get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then(response => {
          if (response === null) {
            return reject(new Error(`Value is null for ${key} key`));
          }

          const jsonValue = JSON.parse(response);
          resolve(jsonValue as T);
        })
        .catch(e => reject(e));
    });
  }

  set<T>(key: string, value: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const jsonString = JSON.stringify(value);
      AsyncStorage.setItem(key, jsonString)
        .then(response => {
          if (response === null) {
            return reject(new Error(`Value was not stored for ${key} key`));
          }

          resolve(value);
        })
        .catch(e => reject(e));
    });
  }

  delete<T>(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key)
        .then(response => {
          if (response === null) {
            return reject(new Error(`Value was not deketed for ${key} key`));
          }

          resolve();
        })
        .catch(e => reject(e));
    });
  }

  clear(): Promise<void> {
    return AsyncStorage.clear();
  }
}
