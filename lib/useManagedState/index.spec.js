import React, { useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';

import useManagedState from '.';

describe('useManagedState', () => {
  const state = { current: null };
  const Cmp = ({ count: countProp = 0, setCount: setCountProp }) => {
    const [count, setCount] = useManagedState(countProp, setCountProp);

    const incrementCount = () => {
      setCount(_count => _count + 1);
    };

    useEffect(() => {
      state.current = count;
    }, [count]);

    return (
      <button type="button" onClick={incrementCount} data-testid="button">
        Hi
      </button>
    );
  };

  it('should allow parent component to manage state', () => {
    const spy = jest.fn();
    const Parent = () => {
      return <Cmp count={2} setCount={spy} />;
    };

    const { getByTestId } = render(<Parent />);

    expect(state.current).toBe(2);

    const button = getByTestId('button');

    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });

  it('should allow component to manage its own state', () => {
    const { getByTestId } = render(<Cmp />);

    expect(state.current).toBe(0);

    const button = getByTestId('button');

    fireEvent.click(button);
    expect(state.current).toBe(1);
  });
});
