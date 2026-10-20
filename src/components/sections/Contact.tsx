"use client";

import { BriefcaseBusiness, Check, Copy, GitBranch, LoaderCircle, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const copyEmail = async () => {
    await navigator.clipboard.writeText("dikeshganboi@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      setError("Please complete the required fields with a valid email and a message of at least 10 characters.");
      setStatus("error");
      return;
    }
    setError("");
    const subject = `Portfolio message from ${name}`;
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      window.location.href = `mailto:dikeshganboi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: key, name, email, message, subject, botcheck: data.get("botcheck") }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setError("Something went wrong. Please email me directly instead.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 overflow-x-clip border-b border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading label="Contact" title="Let's work together" subtitle="I'm a fresher actively looking for my first role. Send me a message and I'll reply soon." />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="space-y-3">
            <ContactCard icon={<Mail size={18} />} label="Email" value="dikeshganboi@gmail.com" href="mailto:dikeshganboi@gmail.com" action={<button onClick={copyEmail} type="button" aria-label="Copy email" className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white">{copied ? <Check size={16} /> : <Copy size={16} />}</button>} />
            <ContactCard icon={<GitBranch size={18} />} label="GitHub" value="github.com/dikeshganboi" href={portfolio.socials.github} />
            <ContactCard icon={<BriefcaseBusiness size={18} />} label="LinkedIn" value="linkedin.com/in/dikeshganboi" href={portfolio.socials.linkedin} />
            <ContactCard icon={<MapPin size={18} />} label="Location" value={portfolio.location} />
            <a href={portfolio.resumeUrl} download className="bg-accent-gradient mt-4 inline-flex rounded-full px-5 py-3 text-sm font-semibold text-white">Download Resume</a>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <input name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Message" name="message" required textarea />
              {status === "error" && <p className="mt-4 text-sm text-rose-300">{error} <a className="underline" href="mailto:dikeshganboi@gmail.com">Email me</a></p>}
              {status === "success" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 text-sm text-emerald-300"><Check size={16} /> Thanks, I&apos;ll get back to you soon</motion.p>}
              <Button type="submit" disabled={status === "sending"} className="bg-accent-gradient mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
                {status === "sending" ? <><LoaderCircle className="animate-spin" size={16} /> Sending...</> : <><Send size={16} /> Send message</>}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value, href, action }: { icon: React.ReactNode; label: string; value: string; href?: string; action?: React.ReactNode }) {
  const content = <><span className="rounded-lg bg-white/5 p-2 text-cyan-300">{icon}</span><span className="min-w-0"><span className="block text-xs text-white/40">{label}</span><span className="block truncate text-sm text-white/80">{value}</span></span></>;
  const className = "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08]";
  if (action) {
    return (
      <div className={className}>
        {href ? (
          <a href={href} className="flex min-w-0 flex-1 items-center gap-3">
            {content}
          </a>
        ) : (
          content
        )}
        {action}
      </div>
    );
  }
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

function Field({ label, name, type = "text", required, textarea = false }: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean }) {
  const className = "mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20";
  return <label className="block text-sm text-white/70">{label}{required && <span className="text-cyan-300"> *</span>}{textarea ? <textarea name={name} required={required} minLength={10} aria-describedby={`${name}-hint`} className={`${className} min-h-36 resize-y`} placeholder="Tell me a little about your project..." /> : <input name={name} type={type} required={required} className={className} />}{textarea && <span id={`${name}-hint`} className="mt-1 block text-xs text-white/35">Minimum 10 characters</span>}</label>;
}
