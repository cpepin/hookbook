# useOutsideClick

Useful hook for detecting clicks outside of a DOM node.

## Example

```jsx
import React, { useRef, useState } from 'react';
import useOutsideClick from '@cpepin/hookbook/lib/hooks/useOutsideClick';

function Component() {
  const elemRef = useRef();
  const [clickedOutside, setClickedOutside] = useState(false);

  const handleOutsideClick = () => {
    setClickedOutside(true);
  };

  useOutsideClick(elemRef, handleOutsideClick);

  return (
    <>
      <div ref={elemRef}>Click outside of me and something will happen</div>
      <button>outside</button>
    </>
  );
}
```

## Use case

For situations where you want to detect a click outside of a DOM node(s), such as tooltips, modals, etc.
