"use client";

import { ArrowUp, LoaderCircle, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const suggestions = ["how do I run evals at scale?", "how do sandbox pools work?", "can I get verified data?"];
const rotating = ["agent", "eval", "rollout", "fleet"];

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % rotating.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  return <em key={rotating[index]} className="rotating-word">{rotating[index]}</em>;
}

export function AskConsole() {
  const [query, setQuery] = useState(suggestions[0]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setAnswer("");
    window.setTimeout(() => {
      setLoading(false);
      setAnswer("Start with Cua Sandbox locally, define a reusable snapshot, then scale the same workload through warm fleet pools. Every machine keeps the same control surface across operating systems.");
    }, 700);
  }

  return (
    <div className="agent-console" aria-label="Ask Cua interactive demo">
      <div className="console-grid" aria-hidden="true" />
      <div className="koala-dots" aria-hidden="true">
        <span className="ear ear-left" /><span className="ear ear-right" />
        <span className="koala-face"><i /><i /><b /></span>
      </div>
      <form className="ask-form" onSubmit={submit}>
        <label htmlFor="ask-cua">/ask</label>
        <input id="ask-cua" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Ask Cua" />
        <button aria-label="Send question" type="submit">{loading ? <LoaderCircle className="spin" size={15} /> : <ArrowUp size={15} />}</button>
      </form>
      <div className="suggestions">
        {suggestions.map((item) => <button type="button" key={item} onClick={() => { setQuery(item); setAnswer(""); }}>{item}</button>)}
      </div>
      <div className={`console-answer ${answer ? "is-visible" : ""}`}><Sparkles size={14} /> <span>{answer}</span></div>
    </div>
  );
}

