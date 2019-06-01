# useDebounce
Heavily inspired by `useDebounce` from usehooks.com, additionally this recipe provides a cancel function to back out of debounced state updates.

## Example
```js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import useDebounce from "./useDebounce";

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, cancelUpdate] = useDebounce(search, 800);

  const handleSearchUpdate = e => setSearch(e.target.value);

  useEffect(() => {
    if (search.length > 0) {
      // Do some async stuff
      console.log("Searching for... ", debouncedSearch);
    } else {
      cancelUpdate();
    }
  }, [debouncedSearch]);

  return (
    <>
      <label htmlFor="search">Search</label>
      <input type="text" onChange={handleSearchUpdate} />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Use Case
The original useDebounce (without cancelUpdate) works great for simple use cases, but there are times when dealing with asynchronous functionality like "search", where you will want to cancel any pending updates.
