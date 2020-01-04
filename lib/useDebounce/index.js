import { useRef, useState, useEffect } from 'react';

/**
 * Heavily inspired by useDebounce from usehooks.com,
 * additionally this recipe provides a cancel function to back out of debounced state updates.
 * @param {*} value state value to debounce
 * @param {*} delay delay before updated debounced value
 *
 * @returns {[debounceValue, cancelUpdate]}
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const cancelUpdate = useRef(() => {});

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    cancelUpdate.current = () => clearTimeout(handler);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, cancelUpdate.current];
}

export default useDebounce;
