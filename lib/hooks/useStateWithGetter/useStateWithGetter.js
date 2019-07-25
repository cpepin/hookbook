
import { useState, useRef } from 'react';

// https://github.com/facebook/react/issues/14543
function useStateWithGetter(initial) {
  const ref = useRef();
  const [state, setState] = useState(initial);
  ref.current = state;
  const set = (value) => {
    ref.current = value;
    setState(value);
  };
  const get = () => {
    return ref.current;
  };
  return [state, set, get];
}

export default useStateWithGetter;
