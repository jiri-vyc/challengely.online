import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Trash2,
  Flame,
  CalendarDays,
  Edit3,
  CircleX,
} from "lucide-react";

import { progressOf, EMOJIS, ACCENTS } from "../utils/utils";
import { DayDot } from "./DayDot";

function currentStreak(days) {
    // find the most recent checked day
    const lastChecked = days.lastIndexOf(true);
    if (lastChecked === -1) return 0;
  
    // count consecutive checks backwards from that day
    let c = 0;
    for (let i = lastChecked; i >= 0 && days[i]; i--) c++;
    return c;
  }
  

  function longestStreak(days) {
    let best = 0, cur = 0;
    for (const d of days) {
      if (d) { cur++; best = Math.max(best, cur); }
      else cur = 0;
    }
    return best;
  }


  function Ring({ value = 0, size = 80, stroke = 10, color = "#9b5cff" }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = (value / 100) * circumference;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={stroke}
          fill="none"
          className="text-foreground"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-black tracking-tight"
          style={{ fontSize: size * 0.26 }}
          fill="currentColor"
        >
          {value}%
        </text>
      </svg>
    );
  }

export function ChallengeCard({ ch, onToggleDay, onDelete, onReset, onUpdate }) {
    const pct = progressOf(ch);
    const cStreak = currentStreak(ch.days);
    const lStreak = longestStreak(ch.days);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(ch.title);
    const [emoji, setEmoji] = useState(ch.emoji);
    const [notes, setNotes] = useState(ch.notes);
    const [accent, setAccent] = useState(ch.accent);
  
    const save = () => {
      onUpdate({ ...ch, title: title.trim() || ch.title, emoji, notes, accent });
      setEditing(false);
    };
  
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/70 p-4 shadow-[0_12px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl"
      >
        {/* slanted neon band */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-44 w-64 -rotate-12 rounded-3xl opacity-20"
          style={{
            background: `linear-gradient(90deg, ${ch.accent}, transparent)`,
            filter: "saturate(150%) blur(20px)",
          }}
        />
  
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <Ring value={pct} size={84} stroke={10} color={ch.accent} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {editing ? (
                <input
                  className="basis-full w-full rounded-xl border border-foreground/20 bg-transparent px-3 py-1.5 text-xl font-extrabold outline-none focus:border-foreground/40"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  aria-label="Challenge title"
                />
              ) : (
                <h3 className="basis-full text-xl font-extrabold tracking-tight">
                  <span className="mr-2 text-2xl" aria-hidden>
                    {ch.emoji}
                  </span>
                  {ch.title}
                </h3>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-foreground/10 px-2 py-1 text-xs text-foreground/60">
                <CalendarDays className="h-3.5 w-3.5" /> {ch.duration} days
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-foreground/10 px-2 py-1 text-xs text-foreground/60">
                <Flame className="h-3.5 w-3.5" /> Streak {cStreak}
              </span>
              <p className="basis-full mt-1 text-sm text-foreground/60 break-words">
               {notes}
               </p>
             
            </div>
  
            {editing ? (
              <div className="mt-2 grid gap-3">
                {/* Row: Emoji (narrow) + Accent (flex) */}
                  <div className="mt-2 flex flex-wrap items-end gap-3">
                    {/* Emoji */}
                    <label className="flex shrink-0 flex-col items-start gap-1 text-sm opacity-80">
                      <span className="whitespace-nowrap">Emoji</span>
                      <select
                        className="w-auto min-w-[2.5rem] rounded-xl border border-foreground/20 bg-transparent px-2 py-1.5 outline-none focus:border-foreground/40"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                      >
                        {EMOJIS.map((em) => (
                          <option key={em} value={em}>{em}</option>
                        ))}
                      </select>
                    </label>
  
                    {/* Accent */}
                    <label className="flex flex-1 min-w-[12rem] flex-col items-start gap-1 text-sm opacity-80">
                      <span className="inline-flex items-center gap-2">
                        <span className="whitespace-nowrap">Accent</span>
                        <span
                          aria-hidden
                          className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-foreground/20"
                          style={{ backgroundColor: accent }}
                        />
                      </span>
                      <select
                        className="w-full min-w-0 rounded-xl border border-foreground/20 bg-transparent px-3 py-1.5 outline-none focus:border-foreground/40"
                        value={accent}
                        onChange={(e) => setAccent(e.target.value)}
                      >
                        {ACCENTS.map((a) => (
                          <option key={a.value} value={a.value}>{a.name}</option>
                        ))}
                      </select>
                    </label>
                  </div>
  
  
  
                <label className="text-sm opacity-80">
                  <span className="mb-1 block">Notes</span>
                  <textarea
                    className="min-h-[72px] w-full rounded-2xl border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Why this challenge? Any rules?"
                  />
                </label>
  
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={save}
                    className="rounded-xl bg-foreground px-3 py-2 text-sm font-semibold text-background hover:opacity-90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="rounded-xl border border-foreground/20 px-3 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
  
  
            <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(2.5rem,1fr))] gap-1">
              {ch.days.map((d, i) => (
                <DayDot
                  key={i}
                  checked={d}
                  index={i}
                  accent={ch.accent}
                  onToggle={(idx) => onToggleDay(ch.id, idx)}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-foreground/60">
              <span>Longest streak: {lStreak}</span>
              <span>
                Started {new Date(ch.startDate).toLocaleDateString()} — {pct}% done
              </span>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <button
              className="inline-flex items-center gap-1 rounded-xl border border-foreground/10 px-2.5 py-1.5 text-xs hover:border-foreground/30"
              onClick={() => setEditing((v) => !v)}
              aria-label="Edit challenge"
              title="Edit"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            {editing && (
              <>
              <button
                className="inline-flex items-center gap-1 rounded-xl border border-foreground/10 px-2.5 py-1.5 text-xs hover:border-foreground/30"
                onClick={() => onReset(ch.id)}
                aria-label="Reset progress"
                title="Reset"
              >
                <CircleX className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center gap-1 rounded-xl border border-foreground/10 px-2.5 py-1.5 text-xs text-red-500 hover:border-red-400/40 hover:text-red-500"
                onClick={() => onDelete(ch.id)}
                aria-label="Delete challenge"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
            )}
          </div>
        </div>
      </motion.div>
    );
  }