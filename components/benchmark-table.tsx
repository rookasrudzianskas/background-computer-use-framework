const agents = [
  ["Claude Fable 5", "Anthropic", "6 / 25"],
  ["GPT-5.5", "OpenAI", "6 / 25"],
  ["Gemini 3.5 Flash", "Google", "5 / 25"],
  ["Claude Sonnet 4.5", "Anthropic", "5 / 25"],
  ["Claude Haiku 4.5", "Anthropic", "5 / 25"],
  ["Gemini 3.1 Pro", "Google", "5 / 25"],
  ["GPT-5.6 Sol", "OpenAI", "5 / 25"],
  ["Claude Opus 4.8", "Anthropic", "4 / 25"],
  ["Muse Spark 1.1", "Meta", "4 / 25"],
  ["Gemini 3 Flash", "Google", "1 / 25"],
];

export function BenchmarkTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`benchmark-module source-benchmark ${compact ? "compact" : ""}`}>
      <div className="source-benchmark-top"><span>EDA · KICAD, V1</span><Link href="/cuabench/leaderboard">Full leaderboard ↗</Link></div>
      <div className="source-benchmark-head"><span>Model</span><span>Full pass</span></div>
      <div className="source-benchmark-rows" role="table" aria-label="Cua-Bench leaderboard">
        {agents.map(agent => <div className="source-benchmark-row" role="row" key={agent[0]}><span><strong>{agent[0]}</strong> <small>{agent[1]}</small></span><code>{agent[2]}</code>{!compact && <i style={{"--score": `${Number.parseInt(agent[2]) / 6 * 100}%`} as React.CSSProperties} />}</div>)}
      </div>
    </div>
  );
}
import Link from "next/link";
