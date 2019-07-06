# useMemoization

One of the common misconceptions about `useMemo` is that it memoizes in the traditional sense by cacheing results of previous function calls. However, `useMemo` simply compares dependencies against the previous render. Attempting to do your own memoization inside of a function component will result in a busted cache on re-render. Combining `useMemo`, and traditional memoization, gives you a memoized function that not only caches all invocations, but maintains that cache throughout subsequent re-renders.

## Example

```jsx
import React, { useEffect, useState } from 'react';

import useMemoization from './useMemoization';

const Search = ({ queryResolver, onResultsChange }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const memoizedQueryResolver = useMemoization(queryResolver);

  const handleChange = (e) => setQuery(e.target.value);

  const resolveResults = () => {
    const newResults = await memoizedQueryResolver(query);
    setResults(newResults);
  };

  useEffect(() => {
    resolveResults();
  }, [query]);

  useEffect(() => {
    onResultsChange(results);
  }, [results]);

  return (
    <input
      type="text"
      onChange={handleChange}
    />
  );
};

```

## Use case

This hook comes in handy when you need to maintain a memoization cache across renders. In the above example, we use `useMemoization` to create a memoized query resolver for our search function. This way, if the user attempts to make a network request to retrieve the same information, it will already be stored in the cache and immediately resolved.

