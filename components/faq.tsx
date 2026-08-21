"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div className={`faq-item ${open === index ? "is-open" : ""}`} key={item.question}>
          <button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>
            <span>{item.question}</span><Plus size={18} />
          </button>
          <div className="faq-answer"><p>{item.answer}</p></div>
        </div>
      ))}
    </div>
  );
}

