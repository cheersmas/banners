import { useMemo } from "react";
import { Banners } from "../components/Banners";

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
  const components = useMemo(() => {
    return data.map((item) => (
      <CustomCard
        key={item.id}
        message={item.message}
        company={item.company}
        name={item.name}
      />
    ));
  }, []);

  return (
    <div className="demo-container">
      <Banners>{components}</Banners>
    </div>
  );
}
