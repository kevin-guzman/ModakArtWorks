import { inject, injectable } from 'inversify';

import { aic } from '../config/api/urls';
import { ArtWork } from '../../domain/entities/artWork';
import { ArtWorksRepository } from '../../domain/repositories/artWorksRepository';
import { Pagination } from '../../domain/shared/types/pagination';
import { HttpManager } from '../network/http';
import { ArtWorksResponse, Field } from '../config/api/types';

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
        .get<ArtWorksResponse>(parametrizedGetUrl)
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
}
