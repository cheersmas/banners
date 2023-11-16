import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { generateDataOfLength } from "./generateRandomText"

const initialClassNames = ['card-0', 'card-1', 'card-2', 'card-3', 'card-4']
const randomTexts = generateDataOfLength(initialClassNames.length)

export function StripeCards() {
  const [classNames, setClassNames] = useState(initialClassNames)
  const [currentHeight, setCurrentHeight] = useState(0)
  const timer = useRef<number>(0)
  const card1 = useRef<HTMLLIElement>(null)

  function updateClassNames() {
    setClassNames(prevClassNames => {
      const updateClassNames = [...prevClassNames]
      updateClassNames.unshift(updateClassNames.pop() as string)
      return updateClassNames
    })
  }

  function updateHeight() {
    const { clientHeight } = card1.current!;
    setCurrentHeight(clientHeight)
  }

  // on mounted start shuffling
  useEffect(() => {
    timer.current = setInterval(() => {
      updateClassNames()
    }, 5000)

    return () => {
      clearInterval(timer.current)
    }
  }, [])

  useLayoutEffect(() => {
    updateHeight()
  }, [classNames])

  return (
    <ul className="container">
      {classNames.map((className, index) => {
        const getTransformation = (height: number, scale: number) => `translateY(${height}px) scale(${scale})`
        const text = randomTexts[index].text.slice(70)
        switch (className) {
          case 'card-0':
            return <li
              className={className}
              key={index}
              style={{
                transform: getTransformation(currentHeight - 30, 1.07)
              }}
            >
              <p>
                {text}
              </p>
            </li>
          case 'card-2':
            return <li
              className={className}
              key={index}
              style={{
                transform: getTransformation(currentHeight + 30, 0.934579)
              }}
            >
              <p>
                {text}
              </p>
            </li>
          case 'card-3':
            return <li
              className={className}
              key={index}
              style={{
                transform: getTransformation(currentHeight + 2 * 30, 0.873439)
              }}
            >
              <p>
                {text}
              </p>
            </li>
          case 'card-4':
            return <li
              className={className}
              key={index}
              style={{
                transform: getTransformation(currentHeight + 3 * 30, 0.816298)
              }}
            >
              <p>
                {text}
              </p>
            </li>

          // card-1
          default:
            return <li
              className={className}
              key={index}
              ref={card1}
              style={{
                transform: getTransformation(currentHeight, 1)
              }}
            >
              <p>
                {text}
              </p>
            </li>
        }
      })}
    </ul>
  )
}

