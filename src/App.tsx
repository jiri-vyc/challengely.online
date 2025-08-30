import { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Flame,
  Sparkles,
} from "lucide-react";

import { ChallengeCard } from "./components/ChallengeCard";
import { NewChallengeModal } from "./components/NewChallengeModal";
import { EmptyState } from "./components/EmptyState";
import { StatCard } from "./components/StatCard";
import { CursorBlob } from "./components/CursorBlob";
import { progressOf } from "./utils/utils";
import { DEFAULTS } from "./consts";

const LS_KEY = "challengely_v1:challenges";


function useLocalStorageState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      console.error(e);
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [key, state]);
  return [state, setState];
}

export default function ChallengelyApp() {
  const [challenges, setChallenges] = useLocalStorageState(LS_KEY, []);
  const [filter, setFilter] = useState("active");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", true);
  }, []);

  const accentForGlow = challenges[0]?.accent || DEFAULTS.accent;

  const filtered = useMemo(() => {
    if (filter === "completed") return challenges.filter((c) => progressOf(c) === 100);
    if (filter === "active") return challenges.filter((c) => progressOf(c) < 100);
    return challenges;
  }, [challenges, filter]);

  const stats = useMemo(() => {
    const total = challenges.length;
    const done = challenges.filter((c) => progressOf(c) === 100).length;
    const avg = total ? Math.round(challenges.reduce((a, c) => a + progressOf(c), 0) / total) : 0;
    return { total, done, avg };
  }, [challenges]);

  const toggleDay = (id, idx) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, days: c.days.map((d, i) => (i === idx ? !d : d)) }
          : c
      )
    );
  };

  const removeChallenge = (id) => setChallenges((prev) => prev.filter((c) => c.id !== id));
  const resetChallenge = (id) =>
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, days: c.days.map(() => false) } : c)));
  const updateChallenge = (next) => setChallenges((prev) => prev.map((c) => (c.id === next.id ? next : c)));

  const createChallenge = (ch) => setChallenges((prev) => [ch, ...prev]);

  // Background mega word
  const BigWord = () => (
    <div
      aria-hidden
      className="pointer-events-none fixed left-1/2 top-10 z-0 -translate-x-1/2 select-none text-center opacity-[0.06]"
      style={{
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, 'Helvetica Neue', Arial",
        fontWeight: 900,
        letterSpacing: -6,
        fontSize: "14rem",
        lineHeight: 1,
        textTransform: "uppercase",
        WebkitTextStroke: "2px currentColor",
      }}
    >
      CHALLENGELY
    </div>
  );

  return (
    <div className={`relative min-h-screen bg-background text-foreground antialiased`}> 
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_80%_-10%,rgba(155,92,255,0.18),transparent),radial-gradient(70rem_35rem_at_10%_-20%,rgba(59,199,255,0.18),transparent)]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(transparent 95%, rgba(255,255,255,0.25) 96%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.25) 96%)", backgroundSize: "24px 24px" }} />
      </div>

      <CursorBlob enabled={true} color={accentForGlow} />
      <BigWord />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:py-6">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -8, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
            className="grid h-10 w-10 place-items-center rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${accentForGlow}, ${accentForGlow}99)` }}
          >
            <Flame className="h-5 w-5 text-background" />
          </motion.div>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-black tracking-tight">Challengely</h1>
              <span className="rounded-md border border-foreground/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground/60">alpha</span>
            </div>
            <p className="text-xs text-foreground/60">Simple minimalistic challenge tracker. Set your goals and just do it.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-2xl border border-foreground/10 p-1 sm:flex" role="tablist" aria-label="Filter challenges">
            {[
              { id: "all", label: "All" },
              { id: "active", label: "Active" },
              { id: "completed", label: "Done" },
            ].map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={filter === t.id}
                onClick={() => setFilter(t.id)}
                className={`rounded-xl px-3 py-1.5 text-sm transition ${
                  filter === t.id ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-foreground px-3 py-2 font-semibold text-background hover:opacity-90"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28">
        {/* quick stats */}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Challenges" value={stats.total} />
          <StatCard label="Completed" value={stats.done} />
          <StatCard className="hidden sm:block" label="Avg. progress" value={`${stats.avg}%`} />
        </div>

        {challenges.length === 0 ? (
          <EmptyState onOpen={() => setModalOpen(true)} />)
        : (
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((ch) => (
                <ChallengeCard
                  key={ch.id}
                  ch={ch}
                  onToggleDay={toggleDay}
                  onDelete={removeChallenge}
                  onReset={resetChallenge}
                  onUpdate={updateChallenge}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-10 p-4 text-center text-[10px] text-foreground/50">
        <span className="inline-flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> 
         OpenSource. No bullshit. No ads. No personal data collected.
              Want to add more? <a href="https://github.com/jiri-vyc/challengely.online" className="text-blue-900">Open a PR</a> or send ideas.
            </span>
      </footer>

      <NewChallengeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createChallenge}
      />
    </div>
  );
}
