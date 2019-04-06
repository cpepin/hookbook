# useManagedState
An idiomatic way to override useState, and manage state on your own.

## Example
```tsx
import * as React from "react";
import useManagedState from "./useManagedState";

interface ITickerProps {
  tickerState?: number;
  setTickerState?: (tickerState: number) => void;
  tickerName?: string;
}

const Ticker = React.memo(
  ({ tickerState = 0, setTickerState, tickerName }: ITickerProps) => {
    const [state, setState] = useManagedState<number>(
      tickerState,
      setTickerState
    );

    const increment = () => {
      setState(state + 1);
    };
    const decrement = () => {
      setState(state - 1);
    };

    return (
      <>
        <h3>
          {tickerName}: {state}
        </h3>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>decrement</button>
      </>
    );
  }
);

export default Ticker;
```

## Use Case
Sometimes, you may need a component (like the `Ticker` component in the example)
that needs to manage it's own internal state, or allow the consumer to override that state and take control.
