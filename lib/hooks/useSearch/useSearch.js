import CustomPromise from 'p-cancelable';
import {
  useState, useLayoutEffect, useEffect, useCallback,
} from 'react';

import useDebounce from '../useDebounce/useDebounce';
import useMemoize from '../useMemoize/useMemoize';

/**
 * Callback function that resolves results from the latest query.
 *
 * @callback onQueryChange
 * @param {string} query
 * @returns {Promise<Array>} results
 */

/**
 * Callback function that is called when results are updated.
 *
 * @callback onResultsChange
 * @param {Array} results
 */

/**
 * Callback function that is called when an error occurs executing
 * query.
 * 
 * @callback onQueryError
 * @param {Error} error
 */

/**
 * Props meant to be applied to any input element.
 *
 * @callback onChange
 * @callback onFocus
 *
 * @typedef {Object} inputProps
 * @property {onChange} onChange
 * @property {onFocus} onFocus
 * @property {string} value
 */

/**
 * Optional useSearch parameters.
 * 
 * @typedef {Object} useSearchOptions
 * @property {number=} [250] debounce - Indicates debounce in MS.
 * @property {string=} initialQuery - Indicates a pre-populated initial query.
 * @property {onResultsChange=} onResultsChange - Callback involked when results have changed.
 * @property {boolean=} [false] resolveOnFocus - Indicates whether or not results should be resolved on focus of the input element.
 * @property {onQueryError} onQueryError - Callback involked when error occurs during query.
 */

/**
 * useSearch results object.
 *
 * @typedef {Object} useSearchResults
 * @property {boolean} areResultsShown - Indicates whether the results should be shown or not, based on the hook state.
 * @property {function} hideResults - Hides the results on call.
 * @property {inputProps} inputProps - Props that should be applied to an input element.
 * @property {boolean} isDirty - Indicates if the input is "dirty".
 * @property {boolean} isLoading - Indicates if the results are loading.
 * @property {string} query - The current state of the query.
 * @property {Array} results - The current result set.
 * @property {function} setQuery - Sets the state of the query.
 * @property {function} setQueryWithoutRefetch - Sets the state of the query without immediately involking result resolution.
 */

/**
 * Hook that encapsulates search logic for text inputs.
 * 
 * @param {onQueryChange} onQueryChange
 * @param {useSearchOptions=} useSearchOptions
 * @returns {useSearchResults} useSearchResults
 */
function useSearch(
  onQueryChange = () => {},
  {
    debounce = 250,
    initialQuery = "",
    onQueryError = () => {},
    onResultsChange = () => {},
    resolveOnFocus = false
  } = {}
) {
  const [areResultsShown, setAreResultsShown] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, cancelUpdate] = useDebounce(query, debounce);
  const [results, setResults] = useState([]);
  const [previousRequest, setPreviousRequest] = useState();
  const [isFetchingEnabled, setIsFetchingEnabled] = useState(true);
  const getResults = CustomPromise.fn(useMemoize(onQueryChange));

  const hideResults = () => setAreResultsShown(false);
  const clearResults = () => setResults([]);
  const setQueryWithoutRefetch = newQuery => {
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