import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import useStateWithGetter from '.';

describe('useStateWithGetter', () => {
  it('should allow consumer to get the current state', () => {
    let getState;

    const Cmp = () => {
      const [, setState, _getState] = useStateWithGetter(0);
      getState = _getState;

      useEffect(() => {
        setState(_state => _state + 1);
      }, []);

      return '';
    };

    render(<Cmp />);
    expect(getState()).toBe(1);
  });
});
