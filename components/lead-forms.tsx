"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export function BenchContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="bench-form-success" role="status"><span>REQUEST RECEIVED</span><strong>Thanks — the Cua team will be in touch.</strong><button type="button" onClick={() => setSubmitted(false)}>send another request</button></div>;
  }

  return (
    <form className="bench-contact-form" onSubmit={submit}>
      <div className="bench-form-grid">
        <input aria-label="Email" required type="email" placeholder="Email *" value={email} onChange={event => setEmail(event.target.value)} />
        <input aria-label="Company" placeholder="Company (optional)" />
      </div>
      <textarea aria-label="Tell us about your use case" required placeholder="Tell us about your use case *" value={useCase} onChange={event => setUseCase(event.target.value)} />
      <button disabled={!email || !useCase}>get in touch</button>
    </form>
  );
}

export function MacWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="waitlist-success" role="status"><span>PARTNERSHIP WAITLIST</span><strong>Your request is in.</strong><p>We’ll review the workload and contact you at your work email.</p><button type="button" onClick={() => setSubmitted(false)}>submit another request</button></div>;
  }

  return (
    <form className="mac-waitlist-form" onSubmit={submit}>
      <div className="form-pair">
        <label>FULL NAME<input required aria-label="Full name" /></label>
        <label>WORK EMAIL<input required type="email" aria-label="Work email" /></label>
      </div>
      <label>COMPANY <small>(optional)</small><input aria-label="Company" /></label>
      <div className="form-pair">
        <label>PRIMARY USE CASE<select required aria-label="Primary use case" defaultValue=""><option value="" disabled>Select one</option><option>Computer-use agents</option><option>Evals and benchmarks</option><option>Data generation</option><option>CI and testing</option><option>Other</option></select></label>
        <label>EXPECTED FLEET SIZE <small>(optional)</small><select aria-label="Expected fleet size" defaultValue=""><option value="">Select a range</option><option>Under 100 machines</option><option>100–999 machines</option><option>1,000+ machines</option></select></label>
      </div>
      <label className="waitlist-check"><input type="checkbox" /> <span>Send me product and research updates beyond this waitlist request.</span></label>
      <button className="button button-primary">Join the Cloud macOS waitlist <ArrowRight size={15} /></button>
    </form>
  );
}
