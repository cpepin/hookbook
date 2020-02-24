
import { useState } from 'react';

/**
 * An idiomatic way to override useState, and manage state on your own.
 * 
 * @param state managed state value
 * @param setState managed setState function
 */
function useManagedState<T>(state: T, setState: (nextState: T) => void) {
  if (!setState) {
    return useState(state);
  }

  return [state, setState];
}

export default useManagedState;