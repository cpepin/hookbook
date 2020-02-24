
import { useCallback, useState, useRef } from 'react';

/**
 * useState function with a getter.
 * 
 * @param initialState
 */
function useStateWithGetter<T>(initialState: T | (() => T)) {
  const ref = useRef<T>();
  const [state, setState] = useState(initialState);
  ref.current = state;

  const set = useCallback((value: T) => {
    ref.current = value;
    setState(value);
  }, [setState]);

  const get = useCallback(() => {
    return ref.current;
  }, []);

  return [state, set, get];
}

export default useStateWithGetter;
