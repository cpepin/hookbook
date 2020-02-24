import CustomPromise from 'p-cancelable';
import {
  useState, useLayoutEffect, useEffect, useCallback,
} from 'react';

import useDebounce from '../useDebounce';
import useMemoize from '../useMemoize';

interface UseSearchOptions {
  debounce?: number;
  initialQuery?: string;
  onQueryError?: (error: any) => void;
  onResultsChange?: (results: any[]) => void;
  resolveOnFocus?: boolean;
}

/**
 * Hook that encapsulates search logic for text inputs.
 * 
 * @param onQueryChange
 * @param useSearchOptions
 * @returns useSearchResults
 */
function useSearch<ResultType>(
  onQueryChange: (query: string) => Promise<ResultType[]>,
  {
    debounce = 250,
    initialQuery = "",
    onQueryError = () => {},
    onResultsChange = () => {},
    resolveOnFocus = false
  } : UseSearchOptions = {}
) {
  const [areResultsShown, setAreResultsShown] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, cancelUpdate] = useDebounce(query, debounce);
  const [results, setResults] = useState<ResultType[]>([]);
  const [previousRequest, setPreviousRequest] = useState<CustomPromise<ResultType[]>>();
  const [isFetchingEnabled, setIsFetchingEnabled] = useState(true);
  const memoizedQueryResolver = useMemoize<(query: string) => Promise<ResultType[]>>(onQueryChange);
  const getResults = CustomPromise.fn(memoizedQueryResolver);

  const hideResults = () => setAreResultsShown(false);
  const clearResults = () => setResults([]);

  const setQueryWithoutRefetch = (newQuery: string) => {
    setIsFetchingEnabled(false);
    setQuery(newQuery);
  };

  const resolveResults = async () => {
    setIsLoading(true);

    // Cancel previous request, queue up new one.
    if (previousRequest) {
      previousRequest.cancel();
    }

    const request = getResults(debouncedQuery);

    setPreviousRequest(request);

    try {
      const _results = await request;
      setResults(_results);
    } catch (e) {
      if (!request.isCanceled) {
        onQueryError(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = useCallback(
    e => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const onFocus = useCallback(() => {
    if (
      resolveOnFocus &&
      debouncedQuery &&
      debouncedQuery.length > 0 &&
      isFetchingEnabled
    ) {
      // @ts-ignore
      getResults.cache.clear();

      clearResults();
      resolveResults();
    }

    setAreResultsShown(true);
    setIsFetchingEnabled(true);
  }, [resolveOnFocus, debouncedQuery, isFetchingEnabled]);

  useLayoutEffect(() => {
    if (isDirty && query && query.length > 0 && isFetchingEnabled) {
      resolveResults();
    } else {
      cancelUpdate();
      clearResults();
    }

    setIsFetchingEnabled(true);
  }, [debouncedQuery]);

  useEffect(() => {
    if (query && query.length > 0 && !isDirty) {
      setIsDirty(true);
    }
  }, [query]);

  useEffect(() => {
    if (isDirty) {
      onResultsChange(results);
    }
  }, [results]);

  return {
    areResultsShown,
    hideResults,
    inputProps: { onChange, onFocus, value: query },
    isDirty,
    isLoading,
    query: debouncedQuery,
    results,
    setQuery,
    setQueryWithoutRefetch
  };
}

export default useSearch;