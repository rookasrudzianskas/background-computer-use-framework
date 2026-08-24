"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";
import flowData from "@/lib/lisa-content.json";

type Model = Record<string, string | string[]>;
type Choice = { label: string; target?: string; href?: string; modelUpdate?: { key: string; value?: string }; clickToCopy?: { toCopy: string; confirmation: string } };
type Input = { type: string; name: string; label: string; choices?: { label: string; value: string }[] };
type Step = { progress?: number; next?: string; isCompact?: boolean; dialog?: { list?: Record<string, unknown>; key?: string; keyMode?: string }; choices?: Choice[] | { key: string; value: Record<string, Choice[]> }; inputs?: Input[]; media?: [string, string][]; showForm?: boolean };
const flow = flowData as unknown as Record<string, Step>;

function plain(value: string) { return value.replace(/<br\s*\/?\s*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/\*/g, "").replace(/&#039;/g, "'"); }
function pickDialog(id: string, step: Step, model: Model) {
  const source = step.dialog?.list;
  if (!source) return "";
  let list: Record<string, unknown> = source;
  if (step.dialog?.key && typeof model[step.dialog.key] === "string") {
    const nested = source[model[step.dialog.key] as string];
    if (nested && typeof nested === "object") list = nested as Record<string, unknown>;
  }
  const values = Object.values(list).filter((value): value is string => typeof value === "string");
  const preferred = id === "greeting" ? values[22] : id === "project-username" ? values[1] : values[0];
  return plain(preferred ?? "");
}
function choicesFor(step: Step, model: Model): Choice[] {
  if (Array.isArray(step.choices)) return step.choices;
  if (step.choices && typeof model[step.choices.key] === "string") return step.choices.value[model[step.choices.key] as string] ?? [];
  return [];
}

function TypeLine({ children, onDone }: { children: string; onDone?: () => void }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let timer = 0; let count = 0;
    timer = window.setInterval(() => { count += 1; setShown(count); if (count >= children.length) { clearInterval(timer); setTimeout(() => onDone?.(), 0); } }, 23);
    return () => clearInterval(timer);
  }, [children, onDone]);
  return <>{children.slice(0, shown).split("\n").map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}<i className="cursor" aria-hidden="true" /></>;
}

function SceneVideo({ source }: { source?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || !source) return;
    if (Hls.isSupported()) { const hls = new Hls({ enableWorker: true, maxBufferLength: 12 }); hls.loadSource(source); hls.attachMedia(video); return () => hls.destroy(); }
    if (video.canPlayType("application/vnd.apple.mpegurl")) video.src = source;
  }, [source]);
  return source ? <video key={source} ref={ref} className="scene-video" autoPlay muted loop playsInline aria-hidden="true" /> : null;
}

export function LisaExperience() {
  const [stepId, setStepId] = useState("intro");
  const [history, setHistory] = useState<string[]>([]);
  const [model, setModel] = useState<Model>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [copied, setCopied] = useState("");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const audio = useRef<HTMLAudioElement>(null);
  const nextTimer = useRef<number | null>(null);
  const step = flow[stepId] ?? flow.greeting;
  const dialogue = useMemo(() => pickDialog(stepId, step, model), [stepId, step, model]);
  const choices = useMemo(() => choicesFor(step, model), [step, model]);
  const sceneMedia = step.media?.find((item) => item[1] === "video")?.[0];

  useEffect(() => { const a = setTimeout(() => setLoaded(true), 1150); return () => clearTimeout(a); }, []);
  useEffect(() => { const el = audio.current; if (!el) return; el.muted = muted; if (!muted) void el.play().catch(() => undefined); }, [muted]);
  const enter = useCallback((target: string) => { if (nextTimer.current) clearTimeout(nextTimer.current); setReady(false); setValues({}); setCopied(""); setHistory((items) => [...items, stepId]); setStepId(target); }, [stepId]);
  const lineDone = useCallback(() => {
    setReady(true);
    if (step.next && !step.inputs?.length && !choices.length) nextTimer.current = window.setTimeout(() => {
      if (stepId === "intro") { setReady(false); setStepId(step.next!); } else enter(step.next!);
    }, step.isCompact ? 1250 : 1900);
  }, [choices.length, enter, step.inputs?.length, step.isCompact, step.next, stepId]);
  const sceneStyle = useMemo(() => ({ transform: `translate3d(${pointer.x * 10}px,${pointer.y * 7}px,0) scale(1.035)` }), [pointer]);

  async function select(choice: Choice) {
    if (choice.clickToCopy) { await navigator.clipboard.writeText(choice.clickToCopy.toCopy); setCopied(choice.clickToCopy.confirmation); return; }
    if (choice.modelUpdate) setModel((current) => ({ ...current, [choice.modelUpdate!.key]: choice.modelUpdate!.value ?? choice.label }));
    if (choice.href) { window.location.assign(choice.href); return; }
    if (choice.target) enter(choice.target);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!step.inputs?.every((input) => input.type === "file" || input.type === "checkboxes" || values[input.name]?.trim())) return;
    setModel((current) => ({ ...current, ...values }));
    if (step.next) enter(step.next);
  }
  function back() {
    if (!history.length) return;
    if (nextTimer.current) clearTimeout(nextTimer.current);
    const target = history.at(-1)!; setReady(false); setValues({}); setCopied(""); setHistory((items) => items.slice(0, -1)); setStepId(target);
  }

  return <main className={`lisa ${loaded ? "is-loaded" : ""}`} onPointerMove={(event) => setPointer({ x: event.clientX / innerWidth - .5, y: event.clientY / innerHeight - .5 })}>
    <audio ref={audio} src="https://lisa.locomotive.ca/assets/lisa/fx/ambient.mp3" loop preload="none" />
    <div className="loader" aria-hidden={loaded}><div className="loader-mark">L.I.S.A.</div><div className="loader-line"><span /></div></div>
    <div className="scene" style={sceneStyle} aria-hidden="true"><SceneVideo source={sceneMedia} /></div><div className="film" aria-hidden="true" />
    <header className="lisa-header"><a className="wordmark" href="https://locomotive.ca">Locomotive<sup>®</sup></a><span className="loco-glyph" aria-hidden="true"><i /><b /></span><a className="talk" href="mailto:info@locomotive.ca">Let&apos;s talk</a></header>
    <div className="progress" aria-label={`${Math.round((step.progress ?? 0) * 100)}% complete`}><span style={{ transform: `scaleX(${step.progress ?? 0})` }} /></div>
    <section className={`dialogue ${step.isCompact ? "is-compact" : ""}`} aria-live="polite">
      {history.length > 0 && <p className="previous">{plain(pickDialog(history.at(-1)!, flow[history.at(-1)!], model))}</p>}
      <p className="spoken"><TypeLine key={stepId} onDone={lineDone}>{dialogue}</TypeLine></p>
      {ready && choices.length > 0 && <div className="choices">{choices.map((choice, index) => <button style={{ animationDelay: `${index * .07}s` }} key={`${choice.label}-${index}`} onClick={() => void select(choice)}><span dangerouslySetInnerHTML={{ __html: choice.label }} /><b>{choice.href ? "↗" : "→"}</b></button>)}</div>}
      {copied && <p className="copy-confirm" role="status">{copied}</p>}
      {ready && step.inputs?.length && <form className="lisa-form" onSubmit={submit}>{step.inputs.map((input) => <div className="field" key={input.name}>
        {input.type === "textarea" ? <textarea aria-label={input.label} placeholder={input.label} value={values[input.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [input.name]: e.target.value }))} /> : input.type === "file" ? <label className="file-field">{input.label}<input type="file" onChange={(e) => setValues((v) => ({ ...v, [input.name]: e.target.files?.[0]?.name ?? "" }))} /></label> : input.type === "checkboxes" ? <fieldset><legend>{input.label}</legend>{input.choices?.map((item) => <label key={item.value}><input type="checkbox" value={item.value} onChange={(e) => { const old = (model[input.name] as string[] | undefined) ?? []; setModel((m) => ({ ...m, [input.name]: e.target.checked ? [...old, item.value] : old.filter((v) => v !== item.value) })); }} />{item.label}</label>)}</fieldset> : <input type={["date", "month", "email"].includes(input.type) ? input.type : "text"} aria-label={input.label} placeholder={input.label} value={values[input.name] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [input.name]: e.target.value }))} />}
      </div>)}<button className="next" aria-label="Next">→</button></form>}
    </section>
    <button disabled={!history.length} className="back" onClick={back} aria-label="Back">↶</button><button className="sound" onClick={() => setMuted((value) => !value)} aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Mute sound"}><span>{muted ? "♪" : "♫"}</span><b>{muted ? "×" : "•"}</b></button><span className="edition">L.I.S.A. / 01</span>
  </main>;
}
