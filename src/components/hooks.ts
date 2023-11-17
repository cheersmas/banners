import { useRef, useState } from "react";

export function useHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  function updateHeight() {
    const { clientHeight } = ref.current!;
    setHeight(clientHeight);
  }

  return { ref, height, updateHeight };
}

export function useClassNameRotation() {
  const [classNames, setClassNames] = useState([
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-0",
  ]);
  const count = useRef(0);

  function updateClassNames() {
    setClassNames((prevClassNames) => {
      const updateClassNames = [...prevClassNames];
      updateClassNames.unshift(updateClassNames.pop() as string);
      return updateClassNames;
    });

    count.current++;
  }

  return { count, classNames, updateClassNames };
}

export function useChildrenIndiciesGen(childrenLength: number) {
  const initialIndexArray = useRef(Array.from({
    length: 5
  }).map((_, index) => index % childrenLength))

  const [childrenIndex, setChildrenIndex] = useState<number[]>(initialIndexArray.current)

  function updateChildrenIndex(currentCount: number, indexToUpdate: number) {
    const indexToInsert = (5 + currentCount) % childrenLength
    console.log(currentCount, indexToUpdate, indexToInsert)
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