import { Pagination } from '../../../domain/shared/types/pagination';
import { ArtWorkID } from './types';

export const AIC_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

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
  },
};
