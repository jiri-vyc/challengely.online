import { motion } from "framer-motion";
import { Sparkles, Plus } from "lucide-react";

export function EmptyState({ onOpen }) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="relative mx-auto mb-6 h-28 w-28">
          <motion.div
            className="absolute inset-0 rounded-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            style={{ background: "radial-gradient(closest-side, #9b5cff44, transparent)" }}
          />
          <Sparkles className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h3 className="mb-2 text-2xl font-extrabold">Make your first challenge</h3>
        <p className="mx-auto mb-4 max-w-md text-foreground/70">
          30 days, 60 days, or custom. Track daily wins with bold vibes and zero clutter.
        </p>
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-2 rounded-2xl bg-foreground px-4 py-2 font-semibold text-background hover:opacity-90"
        >
          <Plus className="h-5 w-5" /> New Challenge
        </button>
      </div>
    );
  }
  