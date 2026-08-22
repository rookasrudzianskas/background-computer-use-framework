"use client";

import { FormEvent, useState } from "react";
import { Bot, Copy, Expand, MessageCircle, Send, X } from "lucide-react";

export function DocsAssistant() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  function ask(event: FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    setMessages(current => [...current, question.trim()]);
    setQuestion("");
  }

  if (!open) return <button className="docs-chat-trigger" onClick={() => setOpen(true)} aria-label="Open Chat"><MessageCircle /></button>;

  return <aside className={`docs-assistant ${expanded ? "expanded" : ""}`} aria-label="Cua Docs Assistant"><header><div><Bot /><strong>Cua Docs Assistant</strong></div><div><button aria-label="Expand assistant panel" onClick={() => setExpanded(value => !value)}><Expand /></button><button aria-label="Copy chat as markdown" onClick={() => navigator.clipboard?.writeText(messages.join("\n\n"))}><Copy /></button><button aria-label="Close" onClick={() => setOpen(false)}><X /></button></div></header><div className="docs-chat-body"><p><strong>Hello!</strong></p><p>I can search Cua&apos;s documentation and code to answer your questions.</p><p>Ask me anything about Cua!</p><small>This is an <b>experimental</b> feature. Refer to the source documentation for the most accurate information.</small>{messages.map(message => <div className="docs-chat-pair" key={message}><span>{message}</span><p>Start with the relevant Cua tutorial or reference page. This local clone keeps the assistant UI interactive while linking you to the source documentation for authoritative details.</p></div>)}</div><form onSubmit={ask}><input aria-label="Type a message" placeholder="Type a message..." value={question} onChange={event => setQuestion(event.target.value)} /><button disabled={!question.trim()} aria-label="Send"><Send /></button></form></aside>;
}
