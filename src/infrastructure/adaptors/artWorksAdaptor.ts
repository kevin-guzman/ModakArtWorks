import { inject, injectable, multiInject } from "inversify";

import { aic } from '../config/api/urls'
import { ArtWork } from "../../domain/entities/artWork";
import { ArtWorksRepository } from "../../domain/repositories/artWorksRepository";
import { Pagination } from "../../domain/shared/types/pagination";
import { HttpManager } from "../network/http";
import { ArtWorksResponse } from "../config/api/types";

@injectable()
export class ArtWorksAdaptor implements ArtWorksRepository {
  @inject("HttpManager")
  private http!: HttpManager;
  constructor() {
  }

  getPaginated(pagination: Pagination): Promise<ArtWork[] | Error> {
    return new Promise((resolve, reject) => {
      this.http.get<ArtWorksResponse>(aic.artWorks.getPaginated(pagination))
        .then(({ data }) => { resolve(data) })
        .catch((err) => { reject(new Error(err)) })
    })
  }
}