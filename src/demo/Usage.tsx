import { useState } from "react";
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

type CardPropsV2 = {
  name: string;
  img: string;
};

function CustomCardV2({ img, name }: CardPropsV2) {
  return (
    <article className="demo custom-card-v2">
      <img src={img} alt={name} />
    </article>
  );
}

export default function Usage() {
  const [currentTab, setCurrentTab] = useState<"testimony" | "pictures">(
    "testimony"
  );

  function setTab(tab: "testimony" | "pictures") {
    setCurrentTab(tab);
  }

  const components = {
    testimony: data.map((item) => (
      <CustomCard
        key={item.id}
        message={item.message}
        company={item.company}
        name={item.name}
      />
    )),
    pictures: data.map((item) => (
      <CustomCardV2 img={item.img} name={item.name} key={item.id} />
    )),
  };

  return (
    <div className="options">
      <section className="buttons-container">
        <button onClick={() => setTab("testimony")}>Testimonies</button>
        <button onClick={() => setTab("pictures")}>Pictures</button>
      </section>
      <div className="demo-container">
        {currentTab === "pictures" && (
          <Banners>{components[currentTab]}</Banners>
        )}
        {currentTab === "testimony" && (
          <Banners>{components[currentTab]}</Banners>
        )}
      </div>
    </div>
  );
}
