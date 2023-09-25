import { ApplicationError } from "../../../../domain/entities/applicationError";
import { ArtWork } from "../../../../domain/entities/artWork";

export type Props = {
  artWorks: ArtWork[]
  onElementClick: (element: ArtWork) => Promise<void>;
  onScrollEnds: () => void;
  showLoader: boolean;
  error: ApplicationError;
}