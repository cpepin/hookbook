import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';

import useOutsideClick from '.';

describe('useOutsideClick', () => {
  const callback = jest.fn();

  const Cmp = ({ ...rest }) => {
    const elementRef = useRef();
    useOutsideClick([elementRef], callback);

    return (
      <div ref={elementRef} {...rest}>
        Test
      </div>
    );
  };

  it('should invoke callback function when user clicks outside the component', () => {
    const { getByTestId } = render(
      <div>
        <Cmp />
        <div data-testid="outside" />
      </div>,
    );

    const outside = getByTestId('outside');
    fireEvent.mouseDown(outside);

    expect(callback).toHaveBeenCalled();
  });

  it('should not invoke callback function when use clicks inside the component', () => {
    const { getByTestId } = render(
      <div>
        <Cmp data-testid="inside" />
        <div />
      </div>,
    );

    const inside = getByTestId('inside');
    fireEvent.mouseDown(inside);

    expect(callback).not.toHaveBeenCalled();
  });
});
