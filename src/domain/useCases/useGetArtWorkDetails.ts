import { useInjection } from 'inversify-react';
import { ArtWorkID } from '../entities/artWorkId';
import { ArtWorksRepository } from '../repositories/artWorksRepository';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { DetailedArtwork } from '../entities/artWork';
import { useApplicationError } from '../shared/hooks/useApplicationError';

export const constants = {
  QUERY_ROUTE: '/details',
  FETCHING_ERROR: 'Error has occured getting art work',
};

export const useGetArtWorkDetail = (id: ArtWorkID) => {
  const artWorksRepository =
    useInjection<ArtWorksRepository>('ArtWorksRepository');
  const [reloadDetails, setReloadDetails] = useState(false);
  const [details, setDetails] = useState<DetailedArtwork | null>(null);
  const { error, setNoError, setMessageFromString } = useApplicationError();

  const detailsQuery = useQuery([constants.QUERY_ROUTE], () =>
    artWorksRepository.getDetails(id),
  );
  const { isLoading, isFetched, refetch } = detailsQuery;

  const onReload = () => {
    setReloadDetails(!reloadDetails);
  };

  useEffect(() => {
    if (isLoading && isFetched) {
      return;
    }

    refetch()
      .then(({ data, isSuccess }) => {
        if (isSuccess) {
          setDetails(data);
          setNoError();
          return;
        }

        setMessageFromString(constants.FETCHING_ERROR);
      })
      .catch(() => {
        setMessageFromString(constants.FETCHING_ERROR);
      });
  }, [reloadDetails]);

  return {
    details,
    onReload,
    error,
    isLoading,
  };
};
