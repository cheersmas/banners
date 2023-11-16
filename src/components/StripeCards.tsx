import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getTransformation } from "./utils";

import "./StripeCards.css";

type Props = {
  children: JSX.Element[];
  duration?: number;
};

const initialClassNames = ["card-1", "card-2", "card-3", "card-4", "card-0"];

export function StripeCards({ children, duration = 2000 }: Props) {
  const [classNames, setClassNames] = useState(initialClassNames);
  const [currentHeight, setCurrentHeight] = useState(0);
  const timer = useRef<number>(0);
  const topCardRef = useRef<HTMLLIElement>(null);

  function updateClassNames() {
    setClassNames((prevClassNames) => {
      const updateClassNames = [...prevClassNames];
      updateClassNames.unshift(updateClassNames.pop() as string);
      return updateClassNames;
    });
  }

  function updateHeight() {
    const { clientHeight } = topCardRef.current!;
    setCurrentHeight(clientHeight);
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      updateClassNames();
    }, duration);

    return () => {
      clearInterval(timer.current);
    };
  }, [duration]);

  useLayoutEffect(() => {
    updateHeight();
  }, [classNames]);

  return (
    <ul className="container">
      {classNames.map((className, index) => {
        const element = children[index];
        switch (className) {
          case "card-0":
            return (
              <li
                className={className}
                key={index}
                style={{
                  transform: getTransformation(currentHeight - 30, 1.07),
                }}
              >
                {element}
              </li>
            );
          case "card-2":
            return (
              <li
                className={className}
                key={index}
                style={{
                  transform: getTransformation(currentHeight + 30, 0.934579),
                }}
              >
                {element}
              </li>
            );
          case "card-3":
            return (
              <li
                className={className}
                key={index}
                style={{
                  transform: getTransformation(
                    currentHeight + 2 * 30,
                    0.873439
                  ),
                }}
              >
                {element}
              </li>
            );
          case "card-4":
            return (
              <li
                className={className}
                key={index}
                style={{
                  transform: getTransformation(
                    currentHeight + 3 * 30,
                    0.816298
                  ),
                }}
              >
                {element}
              </li>
            );

          // card-1
          default:
            return (
              <li
                className={className}
                key={index}
                ref={topCardRef}
                style={{
                  transform: getTransformation(currentHeight, 1),
                }}
              >
                {element}
              </li>
            );
        }
      })}
    </ul>
  );
}
