# useSearch

A helpful hook to manage the state of a Search input component. The result of `useSearch` can be hooked in to any existing input component, in order to generate the necessary state to build a Search input.

## Example
(https://codesandbox.io/s/use-search-jdqvx)

```jsx
import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import useSearch from '@cpepin/hookbook/useSearch';

const users = [];

for (let i = 0; i < 10; i++) {
  users.push({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    id: i,
    lastName: faker.name.lastName()
  });
}

const onQueryChange = async query => {
  const normalizedQuery = query.toLowerCase();

  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          users.filter(
            user => user.firstName.toLowerCase().indexOf(normalizedQuery) !== -1
          )
        ),
      250
    )
  );
};

const onResultsChange = results =>
  console.log("RESULTS", results.map(result => result.firstName));

function App() {
  const { inputProps } = useSearch(onQueryChange, {
    onResultsChange
  });

  return (
    <div className="App">
      <input {...inputProps} />
    </div>
  );
}
```