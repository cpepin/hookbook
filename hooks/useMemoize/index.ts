import memoize from 'lodash/memoize';
import { MemoizedFunction } from 'lodash';
import { useMemo } from 'react';

/**
 * Creates a function with memoized results, that won't get
 * it's cache cleared on render of component.
 * 
 * @param factory The function to have its output memoized.
 * @param resolver The function to resolve the cache key.
 */
function useMemoize<T extends (...args: any[]) => any>(factory: T, resolver?: (...args: any[]) => any): T & MemoizedFunction {
  return useMemo(() => memoize<T>(factory, resolver), [factory, resolver]);
}

export default useMemoize;
