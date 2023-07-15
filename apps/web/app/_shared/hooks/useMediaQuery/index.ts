import { useCallback, useEffect, useState } from 'react';

type UseMediaQueryInput = {
  query: string;
};

export const useMediaQuery = ({ query }: UseMediaQueryInput) => {
  const [isMatches, setIsMatches] = useState(false);

  const handleMediaQuery = useCallback(() => {
    setIsMatches(window.matchMedia(query).matches);
  }, [query]);

  useEffect(() => {
    setIsMatches(true);
    window.addEventListener('resize', handleMediaQuery);

    return () => {
      window.removeEventListener('resize', handleMediaQuery);
    };
  }, [handleMediaQuery]);

  return isMatches;
};
