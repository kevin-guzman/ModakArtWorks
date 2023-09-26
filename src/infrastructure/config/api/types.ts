import { ArtWork } from '../../../domain/entities/artWork';

export type ArtWorkID = number | string;

export enum Field {
  ID = 'id',
  Title = 'title',
  Thumbnail = 'thumbnail',
  Description = 'description',
  Inscriptions = 'inscriptions',
  ImageID = 'image_id',
}

export type ArtWorksResponse<T> = {
  data: T;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
  };
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
};
