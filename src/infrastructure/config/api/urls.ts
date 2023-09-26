import { Pagination } from '../../../domain/shared/types/pagination';
import { ArtWorkID, Field } from './types';

export const AIC_BASE_URL = 'https://api.artic.edu/api/v1/artworks';
export const IIIF_BASE_URL = 'https://www.artic.edu/iiif/2';

export const aic = {
  artWorks: {
    getAll: () => AIC_BASE_URL,
    getDetails: (id: ArtWorkID) => `${AIC_BASE_URL}/${id}`,
    getPaginated: (pagination: Pagination) => {
      const paginationParams = new URLSearchParams();
      paginationParams.append('page', pagination.page.toString());
      paginationParams.append('limit', pagination.limit.toString());

      return `${AIC_BASE_URL}?${paginationParams}`;
    },
    withFileds: (prevURL: string, fields: Field[]) => {
      let fieldsParam = prevURL.includes('?') ? '&fields=' : '?fields';
      fields.forEach((field, index) => {
        const appendComma = index !== fields.length - 1;
        const comma = appendComma ? ',' : '';

        fieldsParam += field + comma;
      });

      return `${prevURL}${fieldsParam}`;
    },
  },
  images: {
    getById: (image_id:string) => `${IIIF_BASE_URL}/${image_id}/full/843,/0/default.jpg`,
  },
};
