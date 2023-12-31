import { useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { useQuery } from 'react-query';

import { ArtWorksRepository } from '../repositories/artWorksRepository';
import { Pagination } from '../shared/types/pagination';
import { ArtWork } from '../entities/artWork';
import { useApplicationError } from '../shared/hooks/useApplicationError';

export const constants = {
  FETCHING_ERROR: 'Error has occured fetching art works',
  QUERY_ROUTE: '/pagination',
};

export const usePaginateArtWorks = (initialPagination: Pagination) => {
  const artWorksRepository =
    useInjection<ArtWorksRepository>('ArtWorksRepository');

  const [artWorks, setArtWorks] = useState<ArtWork[]>([]);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [reloadPagination, setReloadPagination] = useState(false);
  const { error, setNoError, setMessageFromString } = useApplicationError();

  const paginationQuery = useQuery(
    [constants.QUERY_ROUTE],
    () => artWorksRepository.getPaginated(pagination),
    {},
  );
  const { isFetched, isLoading } = paginationQuery;

  const onScrollEnds = () => {
    setReloadPagination(!reloadPagination);
  };
  const reload = () => {
    setArtWorks([]);
    setReloadPagination(!reloadPagination);
  };
  const filterArtWorksFromResponse = (data?: any): ArtWork[] => {
    return data?.filter((artWork: ArtWork) => {
      const { title, thumbnail, description, inscriptions } = artWork;
      const isEmptyArtWork =
        !thumbnail || title === 'Untitled' || !description || !inscriptions;
      return !isEmptyArtWork;
    });
  };

  useEffect(() => {
    if (paginationQuery.isLoading && isFetched) {
      return;
    }

    paginationQuery.refetch().then(({ data, isSuccess }) => {
      if (isSuccess) {
        data = filterArtWorksFromResponse(data);
        
        setArtWorks(prevState => [
          ...new Set(prevState.concat(data as ArtWork[])),
        ]);
        setPagination(prevState => ({
          ...prevState,
          page: prevState.page + 1,
        }));
        const notEnoughData = data.length<2
        if(notEnoughData){
          setReloadPagination(!reloadPagination)
        }
        setNoError();

        return;
      }

      setMessageFromString(constants.FETCHING_ERROR);
    });
  }, [reloadPagination]);

  return {
    artWorks,
    onScrollEnds,
    isLoading,
    error,
    reload,
  };
};
