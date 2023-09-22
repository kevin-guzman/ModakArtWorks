import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useQuery } from "react-query"

import { ArtWorksRepository } from "../repositories/artWorksRepository";
import { Pagination } from "../shared/types/pagination";
import { ArtWork } from "../entities/artWork";
import { ApplicationError } from "../entities/applicationError";

export const usePaginateArtWorks = (initialPagination: Pagination) => {
  const artWorksRepository = useInjection<ArtWorksRepository>("ArtWorksRepository");

  const [artWorks, setArtWorks] = useState<ArtWork[]>([]);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [reloadPagination, setReloadPagination] = useState(false);
  const [error, setError] = useState<ApplicationError>({ hasError: false, message: "" });

  const paginationQuery = useQuery(["/pagination"], () => artWorksRepository.getPaginated(pagination), {});
  const { isFetched, isLoading } = paginationQuery;
  const onScrollEnds = () => {
    setReloadPagination(!reloadPagination);
  }

  useEffect(() => {
    if (paginationQuery.isLoading && isFetched) {
      return;
    }

    paginationQuery.refetch()
      .then(({ data, isSuccess }) => {
        if (isSuccess) {
          setArtWorks((prevState) => [...new Set(prevState.concat(data as ArtWork[]))]);
          setPagination((prevState) => ({ ...prevState, page: prevState.page + 1 }))
          setError({ hasError: false, message: "" })

          return
        }

        setError({ hasError: true, message: "No new arts" })
      })
      .catch(error => setError({ hasError: true, message: error }))
  }, [reloadPagination])

  return {
    artWorks,
    onScrollEnds,
    isLoading,
    error
  }
};