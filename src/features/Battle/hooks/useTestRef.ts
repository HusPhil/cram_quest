

import { MutableRefObject, useRef, useEffect } from 'react';

export const useTestRef = (initialValue: any): MutableRefObject<any> => {
  const testRef = useRef(initialValue);

  useEffect(() => {
    // Any effect logic if needed
  }, [testRef]);

  return testRef;
};
