
import { useCallback, useState, useRef, Dispatch, SetStateAction } from 'react';

/**
 * useState function with a getter.
 * 
 * @param initialState
 */
function useStateWithGetter<T>(initialState: T | (() => T)) {
  const [state, setState] = useState(typeof initialState === 'function' ? (initialState as () => T)() : initialState);
  const ref = useRef<T>(state);
  ref.current = state;

  const set = useCallback<Dispatch<SetStateAction<T>>>((setStateAction) => {
    if (typeof setStateAction === 'function') {
      ref.current = (setStateAction as (prevState: T) => T)(state);
    }

    ref.current = setStateAction as T;
    setState(ref.current);
  }, [setState]);

  const get = useCallback(() => {
    return ref.current;
  }, []);

  return [state, set, get];
}

export default useStateWithGetter;
