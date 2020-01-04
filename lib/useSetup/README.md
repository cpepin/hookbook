# useSetup

A lifecycle hook that executes __prior__ to the first render. This is useful when you want to execute a function once, before an initial render.

## Example

```jsx
import React from 'react';
import useSetup from '@cpepin/hookbook/useSetup';

function YourComponent() {
  useSetup(() => {
    console.log('This occurs before first render!');
  });

  return <div>stuff</div>;
}
```