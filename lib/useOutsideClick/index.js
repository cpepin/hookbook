import { useEffect } from 'react';

const containsClick = e => ref => {
  return ref.current && ref.current.contains(e.target);
};

/**
 * Hook for detecting clicks outside of a DOM node.
 * This is useful when needing to execute a function when someone clicks away from an element.
 * @param refs Array of RefObjects to the desired DOM node(s)
 * @param handleOutsideClick Callback executed when the user has clicked away from the ref
 */
export default function useOutsideClick(refs, handleOutsideClick) {
  useEffect(() => {
    function handleClick(e) {
      if (!refs.some(containsClick(e))) {
        handleOutsideClick(e);
      }
    }

    document.addEventListener('mousedown', handleClick);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [refs, handleOutsideClick]);
}
