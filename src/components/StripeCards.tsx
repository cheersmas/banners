import { useEffect, useLayoutEffect, useRef } from "react";
import { getTransformation } from "./utils";
import {
  useHeight,
  useClassNameRotation,
  useChildrenIndiciesGen,
} from "./hooks";

import "./StripeCards.css";

type Props = {
  children: JSX.Element[];
  duration?: number;
};

export function StripeCards({ children, duration = 2000 }: Props) {
  const {
    ref: topCardRef,
    height: currentHeight,
    updateHeight,
  } = useHeight<HTMLLIElement>();

  const { count, classNames, updateClassNames } = useClassNameRotation();

  const { childrenIndex, updateChildrenIndex } = useChildrenIndiciesGen(
    children.length
  );

  const timer = useRef<number>(0);

  useEffect(() => {
    timer.current = setInterval(() => {
      updateChildrenIndex(count.current, classNames.indexOf("card-0"));
      updateClassNames();
    }, duration);

    return () => {
      clearInterval(timer.current);
    };
  }, [duration, classNames, updateClassNames, count, updateChildrenIndex]);

  useLayoutEffect(() => {
    updateHeight();
  }, [classNames]);

  return (
    <ul className="container">
      {classNames.map((className, index) => {
        const element = children[childrenIndex[index]];
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
