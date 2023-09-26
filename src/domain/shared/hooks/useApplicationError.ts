import { useState } from 'react';
import { ApplicationError } from '../../entities/applicationError';

export const useApplicationError = (initialState?: ApplicationError) => {
  const [error, setError] = useState<ApplicationError>(
    initialState ? initialState : { hasError: false, message: '' },
  );

  const setMessageFromError = (error: Error) => {
    if (!error) return setNoError();

    setError({ hasError: true, message: error.message });
  };

  const setMessageFromString = (error: string) => {
    if (!error || error.length === 0) return setNoError();

    setError({ hasError: true, message: error });
  };

  const setNoError = () => setError({ hasError: false, message: '' });

  return {
    error,
    setError,
    setMessageFromError,
    setNoError,
    setMessageFromString,
  };
};
