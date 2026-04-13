"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    id: "language",
    question: "What language is spoken? Will English be enough?",
    answer: (
      <div className="space-y-4">
        <p>Portuguese is the local language. English is widely spoken in Lisbon (especially hotels + restaurants).</p>
        <p className="font-medium text-indigo-brand">Helpful basics:</p>
        <ul className="space-y-2">
          {[
            { word: "Hello", pt: "Olá", pron: "oh-LAH" },
            { word: "Good morning", pt: "Bom dia", pron: "bohn DEE-ah" },
            { word: "Good evening", pt: "Boa noite", pron: "BOH-ah NOY-tay" },
            { word: "Please", pt: "Por favor", pron: "pohr fah-VOR" },
            { word: "Thank you", pt: "Obrigado / Obrigada", pron: "oh-bree-GAH-doh / oh-bree-GAH-dah" },
            { word: "Excuse me", pt: "Desculpe", pron: "desh-KOOL-peh" },
            { word: "Do you speak English?", pt: "Fala inglês?", pron: "FAH-lah een-GLESH" },
          ].map(({ word, pt, pron }) => (
            <li key={word} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-indigo-brand/60">{word}:</span>
              <span className="font-medium text-indigo-brand">{pt}</span>
              <span className="font-mono text-label-sm text-indigo-brand/40">({pron})</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "food",
    question: "What about food, allergies, or dietary restrictions?",
    answer: (
      <div className="space-y-3">
        <p>All catering has been planned with dietary needs in mind.</p>
        <Tip>If anything isn&apos;t working — find Kendalle or Sarah and we&apos;ll take care of it.</Tip>
      </div>
    ),
  },
  {
    id: "tipping",
    question: "How much should I tip?",
    answer: (
      <ul className="space-y-1.5">
        <li className="flex items-start gap-2"><Bullet />Not required</li>
        <li className="flex items-start gap-2"><Bullet /><span>Typical: <strong>5–10% at restaurants</strong></span></li>
      </ul>
    ),
  },
  {
    id: "getting-around",
    question: "What should I expect getting around Lisbon?",
    answer: (
      <div className="space-y-3">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2"><Bullet />Lots of walking</li>
          <li className="flex items-start gap-2"><Bullet />Hills</li>
          <li className="flex items-start gap-2"><Bullet />Cobblestone streets</li>
        </ul>
        <Tip>Choose footwear wisely.</Tip>
      </div>
    ),
  },
  {
    id: "alcohol",
    question: "What about alcohol?",
    answer: (
      <div className="space-y-3">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2"><Bullet />There will be alcohol at events</li>
          <li className="flex items-start gap-2"><Bullet />Be mindful and know your limits</li>
        </ul>
        <Tip>Show up the next day ready to go.</Tip>
      </div>
    ),
  },
  {
    id: "team-expectations",
    question: "Any team expectations?",
    answer: (
      <ul className="space-y-1.5">
        <li className="flex items-start gap-2"><Bullet />Be inclusive</li>
        <li className="flex items-start gap-2"><Bullet />Mix across teams</li>
        <li className="flex items-start gap-2"><Bullet />Don&apos;t just stick with your usual group</li>
      </ul>
    ),
  },
  {
    id: "jet-lag",
    question: "Jet lag tips?",
    answer: (
      <ul className="space-y-1.5">
        <li className="flex items-start gap-2"><Bullet />You&apos;ll arrive Wednesday — use that time to settle in</li>
        <li className="flex items-start gap-2"><Bullet />Take care of yourself ahead of Thursday</li>
      </ul>
    ),
  },
  {
    id: "help",
    question: "What if something goes wrong or I need help?",
    answer: (
      <div className="space-y-3">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2"><Bullet /><span>Emergency number in Lisbon: <strong>112</strong></span></li>
          <li className="flex items-start gap-2"><Bullet />Or contact Kendalle or Sarah</li>
        </ul>
        <Tip>Don&apos;t hesitate to reach out.</Tip>
      </div>
    ),
  },
  {
    id: "final-note",
    question: "🎯 Final Note",
    answer: (
      <div className="space-y-3">
        <p>We&apos;ll handle the logistics — but please read all the information provided to you. It makes everyone&apos;s lives easier.</p>
        <p>You just need to:</p>
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2"><Bullet />Show up</li>
          <li className="flex items-start gap-2"><Bullet />Be a great teammate</li>
          <li className="flex items-start gap-2"><Bullet />Enjoy Lisbon 🇵🇹</li>
        </ul>
      </div>
    ),
  },
];

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2">
      <span aria-hidden className="font-mono text-cobalt shrink-0">→</span>
      <span className="font-sans text-body-sm text-cobalt font-medium">{children}</span>
    </p>
  );
}

function Bullet() {
  return <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-brand/30 shrink-0 block" />;
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <Nav variant="dark" fixed={false} />

      {/* Page hero */}
      <div className="bg-cobalt pt-16 pb-16 px-8 md:px-12 lg:px-16">
        <h1 className="text-display-xl font-display text-white mb-2">FAQ</h1>
        <p className="font-sans text-body-lg text-white/60">Everything you need to know before Lisbon</p>
      </div>

      {/* FAQ list */}
      <main className="bg-lavender">
        <div className="px-8 md:px-12 lg:px-16 py-12 flex flex-col gap-3 max-w-4xl">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="bg-white border border-lavender-dark">
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 p-6 md:p-8 text-left"
                >
                  <h2 className="font-serif text-display-md text-indigo-brand leading-tight">
                    {faq.question}
                  </h2>
                  <span
                    className={`mt-1 shrink-0 text-indigo-brand/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <ChevronIcon />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-body-md text-indigo-brand/70 border-t border-lavender-dark pt-5 animate-slide-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
