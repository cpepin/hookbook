import { useEffect } from 'react';

/**
 * Hook for detecting clicks outside of a DOM node.
 * This is useful when needing to execute a function when someone clicks away from an element.
 * @param ref RefObject to the desired DOM node
 * @param handleOutsideClick Callback executed when the user has clicked away from the ref
 */

const containsClick = e => ref => {
  return ref.current && ref.current.contains(e.target);
};

export default function useOutsideClick(ref, handleOutsideClick) {
  useEffect(() => {
    function handleClick(e) {
      if (!ref.some(containsClick(e))) {
        handleOutsideClick(e);
      }
    }

    document.addEventListener('mousedown', handleClick);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handleOutsideClick]);
}
