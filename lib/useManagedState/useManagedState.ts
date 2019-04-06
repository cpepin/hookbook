import * as React from 'react';

function useManagedState<T>(
  state?: T,
  setState?: (state: T) => void
): [T, (state: T) => void] {
  if (!setState) {
    return React.useState<T>(state);
  }

  return [state, setState];
}

export default useManagedState;
