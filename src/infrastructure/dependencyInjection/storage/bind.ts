import { Container } from "inversify";

import { LocalStorageManager, RNLocalStorageManager } from "../../storage/local";

export const bind = (container: Container) => {
  container.bind<LocalStorageManager>("LocalStorageManager").to(RNLocalStorageManager);
};