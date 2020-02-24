import { RefObject, useEffect } from 'react';

const containsClick = (e: Event) => (ref: RefObject<HTMLElement>) => {
  return ref.current && ref.current.contains(e.target as Node);
};

/**
 * Hook for detecting clicks outside of a DOM node.
 * This is useful when needing to execute a function when someone clicks away from an element.
 * @param ref RefObject(s) to the desired DOM node
 * @param handleOutsideClick Callback executed when the user has clicked away from the ref
 */

export default function useOutsideClick(
  ref: Array<RefObject<HTMLElement>> | RefObject<HTMLElement>,
  handleOutsideClick: (e: Event) => void,
) {
  useEffect(() => {
    function handleClick(e: Event) {
      const detectClick = containsClick(e);

      if (Array.isArray(ref) && !ref.some(detectClick)) {
        handleOutsideClick(e);
      }

      if (detectClick(ref as RefObject<HTMLElement>)) {
        handleOutsideClick(e);
      }
    }

    document.addEventListener('mousedown', handleClick);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handleOutsideClick]);
}
