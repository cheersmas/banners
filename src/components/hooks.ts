import { useRef, useState, useEffect, useLayoutEffect } from "react";

export function useHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  function updateHeight() {
    const { clientHeight } = ref.current!;
    setHeight(clientHeight);
  }

  return { ref, height, updateHeight };
}

export function useChildrenIndiciesGen(childrenLength: number) {
  const initialIndexArray = useRef(Array.from({
    length: 5
  }).map((_, index) => index % childrenLength))

  const [childrenIndex, setChildrenIndex] = useState<number[]>(initialIndexArray.current)

  function updateChildrenIndex(currentCount: number, indexToUpdate: number) {
    const indexToInsert = (5 + currentCount) % childrenLength
    setChildrenIndex((previousIndicies) => {
      previousIndicies[indexToUpdate] = indexToInsert
      return previousIndicies
    })
  }

  return {
    childrenIndex,
    updateChildrenIndex
  }
}

export function useBanners(childrenLength: number, { duration = 5000 }: { duration: number }) {
  const timer = useRef<number>(0);
  const count = useRef(0);

  const {
    ref: topCardRef,
    height: currentHeight,
    updateHeight,
  } = useHeight<HTMLLIElement>();

  const [classNames, setClassNames] = useState([
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-0",
  ]);

  const { childrenIndex, updateChildrenIndex } = useChildrenIndiciesGen(
    childrenLength
  );


  function updateClassNames() {
    setClassNames((prevClassNames) => {
      const updateClassNames = [...prevClassNames];
      updateClassNames.unshift(updateClassNames.pop() as string);
      return updateClassNames;
    });

    count.current++;
  }

  useLayoutEffect(() => {
    updateHeight();
  }, [classNames]);

  useEffect(() => {
    timer.current = setInterval(() => {
      updateChildrenIndex(count.current, classNames.indexOf("card-0"));
      updateClassNames();
    }, duration);

    return () => {
      clearInterval(timer.current);
    };
  }, [duration, classNames, count, updateChildrenIndex]);

  return { classNames, childrenIndex, currentHeight, topCardRef };
}
