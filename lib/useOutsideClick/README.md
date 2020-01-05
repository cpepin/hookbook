# useOutsideClick

Used to detect clicks outside of a list of RefObjects.

## Example

```jsx
const Cmp = ({ ...rest }) => {
  const elementRef = useRef();
  const handleOutsideClick = () => {
    console.log('click occurred');
  };

  useOutsideClick([elementRef], handleOutsideClick);

  return (
    <div ref={elementRef} {...rest}>
      Test
    </div>
  );
};
```
