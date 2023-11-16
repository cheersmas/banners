import { useState, useCallback } from "react";

export function useFixedLengthArrayGenerator(inputArraySize: number, size: number) {
  const [callCount, setCallCount] = useState(0);

  const generateArray = useCallback(() => {
    const result = [];

    for (let i = 0; i < size; i++) {
      const index = (i + callCount) % inputArraySize;
      result.push(index);
    }

    setCallCount(count => count + 1);
    return result;
  }, [callCount, inputArraySize, size]);


  return { generateArray };
}
