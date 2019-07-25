
import { useState } from 'react';

/**
 * An idiomatic way to override useState, and manage state on your own.
 * 
 * @param {*} state managed state value
 * @param {*} setState managed setState function
 * 
 * @returns {[state, setState]}
 */
function useManagedState(state, setState) {
  if (!setState) {
    return useState(state);
  }

  return [state, setState];
}

export default useManagedState;