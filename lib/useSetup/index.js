import { useState } from 'react';

function useSetup(setupFn) {
  useState(setupFn);
}

export default useSetup;
