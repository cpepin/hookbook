// Note: you could use another implementation or a memoization cache if you'd like.

import memoize from 'lodash/memoize';
import { useMemo } from 'react';

/**
 * Creates a function with memoized results, that won't get
 * it's cache cleared on render of component.
 *
 * @param factory Function to be memoized
 */
function useMemoize<T>(factory: (...args: any[]) => T, resolver?: (...args: any[]) => string) {
  return useMemo(() => memoize(factory, resolver), []);
}

export default useMemoize;