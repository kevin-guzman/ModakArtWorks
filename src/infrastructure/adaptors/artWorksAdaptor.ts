import { inject, injectable } from 'inversify';

import { aic } from '../config/api/urls';
import { ArtWork, DetailedArtwork } from '../../domain/entities/artWork';
import { ArtWorksRepository } from '../../domain/repositories/artWorksRepository';
import { Pagination } from '../../domain/shared/types/pagination';
import { HttpManager } from '../network/http';
import { ArtWorksResponse, Field } from '../config/api/types';
import { ArtWorkID } from '../../domain/entities/artWorkId';

@injectable()
export class ArtWorksAdaptor implements ArtWorksRepository {
  @inject('HttpManager')
  private http!: HttpManager;

  getPaginated(pagination: Pagination): Promise<ArtWork[]> {
    const parametrizedGetUrl = aic.artWorks.withFileds(
      aic.artWorks.getPaginated(pagination),
      [
        Field.ID,
        Field.Description,
        Field.ImageID,
        Field.Inscriptions,
        Field.Thumbnail,
        Field.Title,
      ],
    );

    return new Promise((resolve, reject) => {
      this.http
        .get<ArtWorksResponse<ArtWork[]>>(parametrizedGetUrl)
        .then(({ data }) => {
          if (!data) {
            reject(new Error('Error getting data'));
          }

          resolve(data.filter(aw => aw !== undefined && aw !== null));
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }

  getDetails(id: ArtWorkID): Promise<DetailedArtwork> {
    const parametrizedGetUrl = aic.artWorks.withFileds(
      aic.artWorks.getDetails(id),
      [
        Field.ID,
        Field.Description,
        Field.ImageID,
        Field.Inscriptions,
        Field.Thumbnail,
        Field.Title,
      ],
    );

    return new Promise((resolve, reject) => {
      this.http
        .get<ArtWorksResponse<DetailedArtwork>>(parametrizedGetUrl)
        .then(({ data }) => {
          if (!data) {
            reject(new Error('Error getting data'));
          }

          resolve(data);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}
