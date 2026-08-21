"use client";

import { useMemo, useState } from "react";

const agents = [
  { model: "Claude Opus 4.6", score: 24, tasks: "6 / 25", company: "Anthropic" },
  { model: "GPT-5.4", score: 20, tasks: "5 / 25", company: "OpenAI" },
  { model: "Gemini 3.1 Pro", score: 16, tasks: "4 / 25", company: "Google" },
  { model: "Claude Sonnet 4.5", score: 12, tasks: "3 / 25", company: "Anthropic" },
  { model: "Qwen3-Coder", score: 8, tasks: "2 / 25", company: "Alibaba" },
];

export function BenchmarkTable() {
  const [filter, setFilter] = useState("All agents");
  const rows = useMemo(() => filter === "All agents" ? agents : agents.filter(x => x.company === filter), [filter]);
  return (
    <div className="benchmark-module">
      <div className="benchmark-filters">
        {["All agents", "Anthropic", "OpenAI", "Google"].map(item => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="benchmark-table" role="table" aria-label="Cua-Bench leaderboard">
        <div className="benchmark-row benchmark-head" role="row"><span>Rank</span><span>Agent</span><span>Tasks cleared</span><span>Score</span></div>
        {rows.map((agent, index) => <div className="benchmark-row" role="row" key={agent.model}><span>0{index + 1}</span><span><strong>{agent.model}</strong><small>{agent.company}</small></span><span>{agent.tasks}</span><span>{agent.score}%</span></div>)}
      </div>
    </div>
  );
}

