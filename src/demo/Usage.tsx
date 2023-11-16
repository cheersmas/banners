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
  const components = data.map((testimony) => (
    <CustomCard
      key={testimony.id}
      message={testimony.message}
      name={testimony.name}
      company={testimony.company}
    />
  ));
  return (
    <div className="demo-container">
      <StripeCards>{components}</StripeCards>
    </div>
  );
}
