import { useState, type FormEvent } from "react";
import { contact } from "../data/content";
import { Reveal } from "./Reveal";
import "./contact.css";

type Status = "idle" | "sending" | "sent" | "error";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    // No key configured yet — simulate success so the UX is testable.
    if (!ACCESS_KEY) {
      setStatus("sending");
      setTimeout(() => setStatus("sent"), 700);
      return;
    }

    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New enquiry from nex.dev");
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section section--light contact" id="contact">
      <div className="container contact-grid">
        <Reveal className="contact-intro">
          <span className="eyebrow">Get in touch</span>
          <h2 className="section-title">{contact.heading}</h2>
          <p className="contact-sub">{contact.sub}</p>
          <p className="contact-meta mono">
            <a href="mailto:hello@nex.dev">hello@nex.dev</a> · Erbil, Kurdistan
          </p>
        </Reveal>

        <Reveal delay={0.1} className="contact-card">
          {status === "sent" ? (
            <div className="contact-done">
              <div className="contact-check">✓</div>
              <h3>{contact.success}</h3>
              <button className="btn-ghost" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                <span>Name</span>
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" required placeholder="you@company.com" />
              </label>
              <label>
                <span>What's on your mind?</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="A new app, a website, a system to run the day, or just an idea."
                />
              </label>
              <button type="submit" className="btn-primary contact-submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send it →"}
              </button>
              {status === "error" && (
                <p className="contact-err">Something went wrong. Try again or email hello@nex.dev.</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
