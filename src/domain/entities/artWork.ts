import { ArtWorkID } from './artWorkId';

export type ArtWork = {
  id: ArtWorkID;
  title: string;
  is_favorite: boolean;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  description: null | string;
  inscriptions: string;
  image_id: string;
};

export type DetailedArtwork = ArtWork & {
  artist_titles: string[];
  artist_display: string;
  exhibition_history: string;
  publication_history: string;
};
