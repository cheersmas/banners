import { useEffect, useMemo, useState } from "react";
import { StripeCards } from "../components/StripeCards";

import data from "./data.json";

import "./demo.css";

type CardProps = {
  message: string;
  name: string;
  company: string;
};

function CustomCard({ message, name, company }: CardProps) {
  return (
    <article className="demo custom-card">
      <section>
        <p className="heading">{company.toUpperCase()}</p>
        <p className="message">{message}</p>
        <p className="name">{name}</p>
      </section>
    </article>
  );
}

export default function Usage() {
  const [count, setCount] = useState(0);
  const [componentsIndex, setComponentsIndex] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);

  useEffect(() => {
    const array = Array.from({ length: data.length })
      .slice(0, 5)
      .map((_, i) => i);
    setComponentsIndex(array);
  }, []);

  const components = useMemo(() => {
    return componentsIndex
      .map((item) => data[item])
      .map((item) => (
        <CustomCard
          key={item.id}
          message={item.message}
          company={item.company}
          name={item.name}
        />
      ));
  }, [componentsIndex]);

  function onTick(input: number, index: number) {
    const indexToInsert = (5 + count) % data.length;

    console.log(input, index, indexToInsert);

    setComponentsIndex((previous) => {
      previous[index] = indexToInsert;
      return [...previous];
    });
    setCount(input);
  }

  return (
    <div className="demo-container">
      <StripeCards onTick={onTick}>{components}</StripeCards>
    </div>
  );
}
