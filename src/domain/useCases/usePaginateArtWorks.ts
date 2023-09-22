import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import { useQuery } from "react-query"

import { ArtWorksRepository } from "../repositories/artWorksRepository";
import { Pagination } from "../shared/types/pagination";
import { ArtWork } from "../entities/artWork";

export const usePaginateArtWorks = (initialPagination: Pagination) => {
  const artWorksRepository = useInjection<ArtWorksRepository>("ArtWorksRepository");

  const [artWorks, setArtWorks] = useState<ArtWork[]>([]);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [reloadPagination, setReloadPagination] = useState(false);

  const paginationQuery = useQuery(["/pagination"], () => artWorksRepository.getPaginated(pagination), {});

  const onScrollEnds = () => {
    // TODO: fix lot of realodas here
    console.log("Scroll ended-------------------");

    setReloadPagination(!reloadPagination);
  }

  useEffect(() => {
    paginationQuery.refetch()
      .then(({ data, isSuccess }) => {
        if (isSuccess) {
          setArtWorks((prevState) => prevState.concat(data as ArtWork[]));
          setPagination((prevState) => ({ ...prevState, page: prevState.page + 1 }))
        }
      })
      .catch(console.error)
  }, [reloadPagination])

  return {
    artWorks,
    onScrollEnds,
    isLoading: paginationQuery.isLoading
  }
};