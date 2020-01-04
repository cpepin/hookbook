# useStateWithGetter
A way to access a getter with useState

## Example
```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import useStateWithGetter from '@cpepin/hookbook/useStateWithGetter';

class Incrimentor {
  constructor(controls) {
    console.log("Building incrimentor");
    this.controls = controls;
    this.incriment = this.incriment.bind(this);
    this.inrimentStep = this.inrimentStep.bind(this);
    this.decrimentStep = this.decrimentStep.bind(this);
  }

  incriment() {
    this.controls.setCount(prev => prev + this.controls.getStep());
  }

  inrimentStep() {
    this.controls.setStep(prev => prev + 1);
  }

  decrimentStep() {
    this.controls.setStep(prev => prev - 1);
  }
}

function IncrimentComponent() {
  const [count, setCount] = useState(0);
  const [step, setStep, getStep] = useStateWithGetter(1);

  const [incrimentor] = useState(
    () =>
      new Incrimentor({
        setCount,
        setStep,
        getStep
      })
  );

  return (
    <div>
      <div>Count: {count} </div>
      <div>Step: {step} </div>
      <button onClick={incrimentor.incriment}>Incriment</button>
      <button onClick={incrimentor.inrimentStep}>Step +</button>
      <button onClick={incrimentor.decrimentStep}>Step -</button>
    </div>
  );
}

export default IncrimentComponent;
```

## Use Case
Sometimes you may need a component like the `IncrimentComponent` that will pass the state controls off to some sort of controller. In this case you may need the ability to read the values from outside the component. 