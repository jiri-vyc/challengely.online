import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    CheckCircle2,
  } from "lucide-react";

export function DayDot({
    checked,
    index,
    onToggle,
    accent,
  }) {
    return (
      <motion.button
        type="button"
        onClick={() => onToggle(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(index);
          }
        }}
        aria-label={`Day ${index + 1} ${checked ? "done" : "not done"}`}
        role="checkbox"
        aria-checked={checked}
        className={`group relative flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          checked
            ? "border-transparent text-background"
            : "border-foreground/20 text-foreground/70 hover:border-foreground/40"
        }`}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        style={
          checked
            ? {
                background: `linear-gradient(135deg, ${accent}, ${accent}90)`,
                boxShadow: `0 8px 24px ${accent}42`,
              }
            : {}
        }
      >
        {checked ? (
          <CheckCircle2 className="h-4 w-4" aria-hidden />
        ) : (
          index + 1
        )}
        {/* corner check accent */}
        <motion.svg
          aria-hidden
          viewBox="0 0 12 12"
          className={`pointer-events-none absolute right-0 top-0 -translate-y-1 translate-x-1 h-3 w-3 transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
          style={{ overflow: "visible" }}
          initial={false} // don't re-run initial on toggle
        >
          <motion.path
            d="M2 6.5 L5 9.5 L10 2.5"
            fill="none"
            stroke={accent}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={checked ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ type: "tween", duration: 0.18, ease: "easeInOut" }}
          />
        </motion.svg>
  
  
  
      </motion.button>
    );
  }