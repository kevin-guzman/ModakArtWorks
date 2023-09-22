import { Container } from "inversify";

import { ArtWorksRepository } from "../../../domain/repositories/artWorksRepository";
import { ArtWorksAdaptor } from "../../adaptors/artWorksAdaptor";

export const bind = (container: Container) => {
  container.bind<ArtWorksRepository>("ArtWorksRepository").to(ArtWorksAdaptor);
};