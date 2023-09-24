import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useQuery } from "react-query"

import { ArtWorksRepository } from "../repositories/artWorksRepository";
import { Pagination } from "../shared/types/pagination";
import { ArtWork } from "../entities/artWork";
import { ApplicationError } from "../entities/applicationError";

export const constants = {
  FETCHING_ERROR: "Error has occured fetching art works",
  QUERY_ROUTE: "/pagination"
}

export const usePaginateArtWorks = (initialPagination: Pagination) => {
  const artWorksRepository = useInjection<ArtWorksRepository>("ArtWorksRepository");

  const [artWorks, setArtWorks] = useState<ArtWork[]>([]);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [reloadPagination, setReloadPagination] = useState(false);
  const [error, setError] = useState<ApplicationError>({ hasError: false, message: "" });
  const [unmountedComponent, setUnmountedComponent] = useState(false);

  const paginationQuery = useQuery([constants.QUERY_ROUTE], () => artWorksRepository.getPaginated(pagination), {});
  const { isFetched, isLoading, } = paginationQuery;

  const onScrollEnds = () => {
    setReloadPagination(!reloadPagination);
  }
  const onUnmountComponent = ()=>{
    setUnmountedComponent(true);
  }

  useEffect(() => {
    if(unmountedComponent){
      return;
    }

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

        setError({ hasError: true, message: constants.FETCHING_ERROR })
      })
  }, [reloadPagination, unmountedComponent])

  useEffect(()=>{
    return ()=>{
      onUnmountComponent()
    }
  }, [])

  return {
    artWorks,
    onScrollEnds,
    isLoading,
    error,
  }
};