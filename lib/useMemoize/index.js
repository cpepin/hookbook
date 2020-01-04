import { useMemo } from 'react';

import memoize from '../utils/memoize';

/**
 * Creates a function with memoized results, that won't get
 * it's cache cleared on render of component.
 * @param {*} factory The function to have its output memoized.
 * @param {*} resolver The function to resolve the cache key.
 *
 * @returns {memoizedFunction}
 */
function useMemoize(factory, resolver) {
  return useMemo(() => memoize(factory, resolver), [factory, resolver]);
}

export default useMemoize;
