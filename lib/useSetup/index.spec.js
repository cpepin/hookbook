import React from 'react';
import { render } from '@testing-library/react';

import useSetup from '.';

describe('useSetup', () => {
  it('should execute setup function', () => {
    const spy = jest.fn();

    const Cmp = () => {
      useSetup(spy);

      return '';
    };

    render(<Cmp />);

    expect(spy).toHaveBeenCalled();
  });
});
