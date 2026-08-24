"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Branch = "project" | "team" | "hello" | "culture" | "email";
type Stage = "intro" | "menu" | "reply" | "form" | "thanks";
const choices: { id: Branch; label: string }[] = [{id:"project",label:"Start a project"},{id:"team",label:"Join the team"},{id:"hello",label:"Drop a quick word"},{id:"culture",label:"Discover our culture"},{id:"email",label:"Write us: info@locomotive.ca"}];
const scripts: Record<Branch,{reply:string;question?:string;placeholder?:string}> = {
  project:{reply:"Ooooh, a fresh project? Now we’re talking. Time to stir up some digital trouble.",question:"Before we build an empire together—what’s your name?",placeholder:"Your name"},
  team:{reply:"Ah, looking to join the crew? I like your ambition already.",question:"Tell me your name and I’ll point you in the right direction.",placeholder:"Your name"},
  hello:{reply:"A quick word can become a very good conversation.",question:"Who am I speaking with?",placeholder:"Your name"},
  culture:{reply:"Curious about the humans behind the machine? Excellent instinct.",question:"What should I call you, fellow explorer?",placeholder:"Your name"},
  email:{reply:"Old-school email. Reliable, direct, delightfully human.",question:"You can reach the team at info@locomotive.ca."}
};

function TypeLine({children,delay=0,onDone}:{children:string;delay?:number;onDone?:()=>void}){
  const [shown,setShown]=useState(0);
  useEffect(()=>{let timer=0;let count=0;const start=window.setTimeout(()=>{timer=window.setInterval(()=>{count+=1;setShown(count);if(count>=children.length){window.clearInterval(timer);window.setTimeout(()=>onDone?.(),0)}},24)},delay);return()=>{window.clearTimeout(start);window.clearInterval(timer)}},[children,delay,onDone]);
  return <span>{children.slice(0,shown)}<i className="cursor" aria-hidden="true" /></span>;
}

export function LisaExperience(){
  const [stage,setStage]=useState<Stage>("intro"); const [branch,setBranch]=useState<Branch|null>(null); const [muted,setMuted]=useState(true); const [name,setName]=useState(""); const [loaded,setLoaded]=useState(false); const [menuReady,setMenuReady]=useState(false); const [pointer,setPointer]=useState({x:0,y:0});
  const audio=useRef<HTMLAudioElement>(null); const current=branch?scripts[branch]:null;
  useEffect(()=>{const a=window.setTimeout(()=>setLoaded(true),1150);const b=window.setTimeout(()=>setStage("menu"),3350);return()=>{clearTimeout(a);clearTimeout(b)}},[]);
  useEffect(()=>{const el=audio.current;if(!el)return;el.muted=muted;if(!muted)void el.play().catch(()=>undefined)},[muted]);
  const imageStyle=useMemo(()=>({transform:`translate3d(${pointer.x*10}px,${pointer.y*7}px,0) scale(1.035)`}),[pointer]);
  function choose(id:Branch){setBranch(id);setStage("reply");setName("");window.setTimeout(()=>setStage(scripts[id].question&&id!=="email"?"form":"reply"),2750)}
  function submit(e:FormEvent){e.preventDefault();if(name.trim())setStage("thanks")}
  const revealChoices=useCallback(()=>setMenuReady(true),[]);
  function back(){if(stage!=="menu"){setBranch(null);setName("");setMenuReady(false);setStage("menu")}}
  return <main className={`lisa ${loaded?"is-loaded":""}`} onPointerMove={e=>setPointer({x:e.clientX/innerWidth-.5,y:e.clientY/innerHeight-.5})}>
    <audio ref={audio} src="https://lisa.locomotive.ca/assets/lisa/fx/ambient.mp3" loop preload="none" />
    <div className="loader" aria-hidden={loaded}><div className="loader-mark">L.I.S.A.</div><div className="loader-line"><span /></div></div>
    <div className="scene" style={imageStyle} aria-hidden="true"/><div className="film" aria-hidden="true"/>
    <header className="lisa-header"><a className="wordmark" href="https://locomotive.ca">Locomotive<sup>®</sup></a><span className="loco-glyph" aria-hidden="true"><i/><b/></span><a className="talk" href="mailto:info@locomotive.ca">Let&apos;s talk</a></header>
    <section className="dialogue" aria-live="polite">
      {stage==="intro"&&<p className="spoken"><TypeLine>Hi there, I am L.I.S.A., Locomotive’s Interactive Super Assistant</TypeLine></p>}
      {stage==="menu"&&<><p className="previous">Hi there, I am L.I.S.A.<br/>Locomotive&apos;s Interactive Super Assistant</p><p className="spoken"><TypeLine onDone={revealChoices}>Great timing! I just finished my AI yoga session. Can I help?</TypeLine></p>{menuReady&&<div className="choices">{choices.map((c,i)=><button style={{animationDelay:`${i*.08}s`}} key={c.id} onClick={()=>choose(c.id)}>{c.label}<span>↗</span></button>)}</div>}</>}
      {(stage==="reply"||stage==="form")&&current&&<><p className="previous">Great timing! I just finished my AI yoga<br/>session. Can I help?</p><p className="spoken"><TypeLine key={current.reply}>{current.reply}</TypeLine></p>{stage==="form"&&current.question&&<div className="followup"><p><TypeLine key={current.question}>{current.question}</TypeLine></p><form onSubmit={submit}><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder={current.placeholder} aria-label={current.placeholder}/><button aria-label="Next">→</button></form></div>}{branch==="email"&&<a className="email-link" href="mailto:info@locomotive.ca">info@locomotive.ca ↗</a>}</>}
      {stage==="thanks"&&<><p className="previous">Before we build an empire together—what&apos;s your name?</p><p className="spoken"><TypeLine>{`Lovely to meet you, ${name.trim()}. The humans at Locomotive are ready when you are.`}</TypeLine></p><a className="email-link" href="mailto:info@locomotive.ca">Continue by email ↗</a></>}
    </section>
    <button className={`back ${stage==="menu"||stage==="intro"?"is-disabled":""}`} onClick={back} aria-label="Back">↶</button><button className="sound" onClick={()=>setMuted(v=>!v)} aria-label={muted?"Turn sound on":"Mute sound"}><span>{muted?"♪":"♫"}</span><b>{muted?"×":"•"}</b></button><span className="edition">L.I.S.A. / 01</span>
  </main>
}
