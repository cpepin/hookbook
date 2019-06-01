import { useRef, useState, useEffect } from "react";

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
