import { ArtWork } from '../../../domain/entities/artWork';

export type ArtWorkID = number | string;

export type ArtWorksResponse = {
  data: ArtWork[];
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
