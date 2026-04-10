"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-sec" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="text-center">
          <div className="sec-tag">Common Questions</div>
          <h2 className="sec-title" id="faq-title">
            Frequently Asked <em>Questions</em>
          </h2>
          <div className="sec-line"></div>
        </div>
        <div style={{ maxWidth: 800, margin: "40px auto 0" }}>
          {faqItems.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-q ${openIndex === i ? "open" : ""}`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-a-${i}`}
              >
                {item.question}
              </button>
              <div
                id={`faq-a-${i}`}
                className={`faq-a ${openIndex === i ? "open" : ""}`}
                role="region"
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
