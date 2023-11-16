import React, { useEffect, useRef, useState } from "react"
import { generateDataOfLength } from "./generateRandomText"

// function buildChunkGetter<T>(inputArray: T[], noOfElements: number) {
//   let count = 0
//   return function get()  {
//     let i = 0     
//     const array = []
//     while (i < noOfElements) {
//       array.push(inputArray[(i + count) % inputArray.length])
//       i++ 
//     }
//     count++
//     return array
//   }
// }

const initialClassNames = ['card-0', 'card-1', 'card-2', 'card-3', 'card-4']
const randomTexts = generateDataOfLength(initialClassNames.length)

export function StripeCards() {
  const [classNames, setClassNames] = useState(initialClassNames)
  const [height, setHeight] = useState({
    prevHeight: 0,
    currHeight: 0
  })
  const timer = useRef<number>(0)
  const visibleDiv = useRef<HTMLDivElement>(null)

  function updateClassNames() {
    setClassNames(prevClassNames => {
      const updateClassNames = [...prevClassNames]
      updateClassNames.unshift(updateClassNames.pop() as string)
      return updateClassNames
    })
  }

  function updateHeight() {
    if (visibleDiv.current !== null) {
      const { height } = visibleDiv.current.getBoundingClientRect()
      setHeight((prevValue) => {
        return {
          prevHeight: prevValue.currHeight,
          currHeight: height
        }
      })
    }
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

  useEffect(() => {
    updateHeight()
  }, [classNames])

  return (
    <div className="container" style={{ '--curr-card-height': `${height.currHeight}px`, '--prev-card-height': `${height.prevHeight}px` } as React.CSSProperties}>
      {/* <div className="container" > */}
      {classNames.map((className, index) => {
        if (className === 'card-1') {
          return <div className={`card ${className}`} key={index} ref={visibleDiv}>
            {randomTexts[index].text}
          </div>
        }

        return <div className={`card ${className}`} key={index} >
          {randomTexts[index].text}
        </div>
      })}
      {/* <div className="card card-0" /> 
      <div className="card card-1" />
      <div className="card card-2" />
      <div className="card card-3" />
      <div className="card card-4" /> */}
    </div>
  )
}

