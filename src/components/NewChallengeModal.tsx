import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import { ACCENTS, EMOJIS, uid, clamp } from "../utils/utils";
import { DEFAULTS } from "../consts";

function makeChallenge(partial) {
  const duration = Number(partial?.duration || DEFAULTS.duration);
  return {
    id: uid(),
    title: partial?.title?.trim() || "New Challenge",
    emoji: partial?.emoji || "🔥",
    notes: partial?.notes || "",
    duration,
    startDate: new Date().toISOString(),
    accent: partial?.accent || DEFAULTS.accent,
    days: Array.from({ length: duration }, () => false),
  };
}

export function NewChallengeModal({ open, onClose, onCreate }) {
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState("🔥");
    const [duration, setDuration] = useState(DEFAULTS.duration);
    const [notes, setNotes] = useState("");
    const [accent, setAccent] = useState(DEFAULTS.accent);
    const ref = useRef(null);
  
    useEffect(() => {
      if (open) setTimeout(() => ref.current?.focus(), 50);
    }, [open]);
  
    const submit = () => {
      onCreate(makeChallenge({ title, emoji, duration, notes, accent }));
      setTitle("");
      setEmoji("🔥");
      setDuration(DEFAULTS.duration);
      setNotes("");
      setAccent(DEFAULTS.accent);
    };
  
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/70 backdrop-blur-md"
              onClick={onClose}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal
              aria-label="Create new challenge"
              initial={{ y: 32, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 24, scale: 0.97, opacity: 0 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-foreground/10 bg-background p-4 shadow-2xl"
            >
              <h2 className="mb-2 text-2xl font-extrabold">
                <span className="mr-2">🚀</span> New Challenge
              </h2>
              <div className="grid gap-3">
                <label className="text-sm">
                  <span className="mb-1 block">Title</span>
                  <input
                    ref={ref}
                    className="w-full rounded-2xl border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
                    placeholder="30‑day cold showers, 10k steps…"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                
                {/* Row: Emoji | Accent color | Duration */}
                <div className="flex flex-wrap items-end gap-3">
                  {/* Emoji (compact) */}
                  <label className="flex shrink-0 flex-col items-start gap-1 text-sm">
                    <span className="whitespace-nowrap">Emoji</span>
                    <select
                      className="w-auto min-w-[2.5rem] rounded-2xl border border-foreground/20 bg-transparent px-2 py-2 outline-none focus:border-foreground/40"
                      value={emoji}
                      onChange={(e) => setEmoji(e.target.value)}
                    >
                      {EMOJIS.map((em) => (
                        <option key={em} value={em}>{em}</option>
                      ))}
                    </select>
                  </label>
  
                  {/* Accent (flexes to fill) */}
                  <label className="flex min-w-[12rem] flex-1 flex-col items-start gap-1 text-sm">
                    <span className="inline-flex items-center gap-2">
                      Accent color
                      <span
                        aria-hidden
                        className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-foreground/20"
                        style={{ backgroundColor: accent }}
                      />
                    </span>
                    <select
                      className="w-full min-w-0 rounded-2xl border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
                      value={accent}
                      onChange={(e) => setAccent(e.target.value)}
                    >
                      {ACCENTS.map((a) => (
                        <option key={a.value} value={a.value}>{a.name}</option>
                      ))}
                    </select>
                  </label>
  
                  {/* Duration (preset options, compact) */}
                  <label className="flex shrink-0 flex-col items-start gap-1 text-sm">
                    <span className="whitespace-nowrap">Duration</span>
                    <input type="number" min={1} max={365} className="w-full rounded-2xl border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40" value={duration} onChange={(e) => setDuration(clamp(Number(e.target.value), 1, 365))} />
                  </label>
                </div>
  
  
                <label className="text-sm">
                  <span className="mb-1 block">Notes</span>
                  <textarea
                    className="min-h-[84px] w-full rounded-2xl border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
                    placeholder="Why this challenge? Any rules?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
                <div className="mt-1 flex items-center justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="rounded-xl border border-foreground/20 px-4 py-2 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      submit();
                      onClose();
                    }}
                    className="rounded-xl px-4 py-2 font-semibold text-background shadow-[0_6px_30px_rgba(0,0,0,0.2)]"
                    style={{ background: `linear-gradient(135deg, ${accent}, ${accent}90)` }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }