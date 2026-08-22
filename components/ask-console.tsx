"use client";

import Image from "next/image";
import { ArrowUp, LoaderCircle } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const suggestions = ["how do I run evals at scale?", "how do sandbox pools work?", "can I get verified data?"];
const rotating = ["human", "agent", "eval", "rollout"];

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % rotating.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  return <em key={rotating[index]} className="rotating-word">{rotating[index]}</em>;
}

function MeshCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const draw = (time = 0) => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#010204";
      context.fillRect(0, 0, width, height);

      const t = time * 0.00008;
      const lights = [
        { x: width * (0.28 + Math.sin(t) * 0.07), y: height * (0.17 + Math.cos(t * 1.4) * 0.05), r: width * 0.52, c: "rgba(214,233,248,.96)" },
        { x: width * (0.55 + Math.cos(t * .7) * 0.1), y: height * (0.13 + Math.sin(t) * .05), r: width * 0.42, c: "rgba(104,145,178,.56)" },
        { x: width * (0.18 + Math.sin(t * .55) * .12), y: height * .53, r: width * .48, c: "rgba(52,75,96,.48)" },
      ];
      for (const light of lights) {
        const gradient = context.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.r);
        gradient.addColorStop(0, light.c);
        gradient.addColorStop(.38, light.c.replace(/[,][^,]+\)$/, ",.28)"));
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.globalCompositeOperation = "screen";
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }
      context.globalCompositeOperation = "source-over";
      const shade = context.createLinearGradient(0, 0, 0, height);
      shade.addColorStop(0, "rgba(0,3,7,.02)");
      shade.addColorStop(.62, "rgba(0,0,0,.34)");
      shade.addColorStop(1, "#000");
      context.fillStyle = shade;
      context.fillRect(0, 0, width, height);
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="hero-mesh" aria-hidden="true" />;
}

function ParticleKoala({ hidden }: { hidden: boolean }) {
  return (
    <div className={`particle-koala ${hidden ? "is-hidden" : ""}`} aria-hidden="true">
      <Image src="/assets/cua/koala.svg" alt="" width={425} height={511} priority />
    </div>
  );
}

const answers: Record<string, string> = {
  [suggestions[0]]: "Start locally with Cua Sandbox, define a reusable snapshot, then scale the same evaluation across warm fleet pools. Each machine keeps the same control surface across operating systems.",
  [suggestions[1]]: "Warm pools keep verified snapshots pre-booted. Claim a machine in milliseconds, run the rollout, collect state and reward, then release it for a clean reset.",
  [suggestions[2]]: "Yes. Cua can deliver verified trajectories with task evaluators, screenshots, accessibility state, action traces, and human-reviewed golden runs.",
};

export function HeroExperience() {
  const [query, setQuery] = useState(suggestions[0]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [stream, setStream] = useState("");

  function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setAnswer("");
    setStream("");
    window.setTimeout(() => {
      setLoading(false);
      setAnswer(answers[query] || `Cua runs ${query.toLowerCase()} across reproducible Linux, Windows, macOS, and Android machines through one driver surface.`);
    }, 620);
  }

  useEffect(() => {
    if (!answer) return;
    const words = answer.split(" ");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setStream(words.slice(0, index).join(" "));
      if (index >= words.length) window.clearInterval(timer);
    }, 27);
    return () => window.clearInterval(timer);
  }, [answer]);

  return (
    <div className={`hero-experience ${loading || answer ? "is-answering" : ""}`} aria-label="Ask Cua interactive demo">
      <div className="hero-screen-stage">
        <div className="mac-screen-frame">
          <div className="mac-screen-inner">
            <div className="screen-grid" aria-hidden="true" />
            <ParticleKoala hidden={Boolean(loading || answer)} />
            <div className={`hero-chat ${loading || answer ? "is-visible" : ""}`} aria-live="polite">
              <span className="chat-label">CUA / FLEET CONSOLE</span>
              <div className="chat-line"><b>&gt;</b> {query}</div>
              {loading ? <div className="chat-loading"><i /><i /><i /> querying fleet</div> : <p>{stream}<span className="typing-cursor" /></p>}
              {answer && <div className="chat-meta"><span>4 OS families</span><span>verified snapshots</span><span>warm pool ready</span></div>}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-screen-ask">
        <form className="ask-form" onSubmit={submit}>
          <label htmlFor="ask-cua">/ask</label>
          <input id="ask-cua" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ask about evals, warm pools, verified data..." aria-label="Ask Cua" />
          <button aria-label="Send question" type="submit">{loading ? <LoaderCircle className="spin" size={15} /> : <ArrowUp size={15} />}</button>
        </form>
        <div className="suggestions">
          {suggestions.map((item, index) => <button type="button" key={item} onClick={() => { setQuery(item); setAnswer(""); setStream(""); }}>{index === 0 ? "◉" : index === 1 ? "◇" : "◍"} {item}</button>)}
        </div>
      </div>
    </div>
  );
}

export { MeshCanvas };
