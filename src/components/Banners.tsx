import { useMemo } from "react";
import { getTransformation } from "./utils";
import { useBanners } from "./hooks";

import "./Banners.css";

type Props = {
  children: JSX.Element[];
  duration?: number;
};

export function Banners({ children, duration = 5000 }: Props) {
  const { childrenIndex, classNames, currentHeight, topCardRef } = useBanners(
    children.length,
    { duration }
  );

  const transformationMap: Record<string, string> = useMemo(
    () => ({
      "card-0": getTransformation(currentHeight - 30, 1.07),
      "card-1": getTransformation(currentHeight, 1),
      "card-2": getTransformation(currentHeight + 30, 0.934579),
      "card-3": getTransformation(currentHeight + 2 * 30, 0.873439),
      "card-4": getTransformation(currentHeight + 3 * 30, 0.816298),
    }),
    [currentHeight]
  );

  return (
    <ul className="container">
      {classNames.map((className, index) => {
        const element = children[childrenIndex[index]];
        if (className === "card-1") {
          return (
            <li
              className={className}
              key={index}
              ref={topCardRef}
              style={{
                transform: transformationMap[className],
              }}
            >
              {element}
            </li>
          );
        }

        return (
          <li
            className={className}
            key={index}
            style={{
              transform: transformationMap[className],
            }}
          >
            {element}
          </li>
        );
      })}
    </ul>
  );
}
