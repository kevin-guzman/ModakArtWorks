import { ArtWork } from "../../../../domain/entities/artWork";

export type Props = {
  addToFavoritesHandler: (element: ArtWork) => Promise<void>;
  artWork: ArtWork;
}