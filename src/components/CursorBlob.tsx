import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export function CursorBlob({enabled, color}) {
    const [pos, setPos] = useState({ x: -9999, y: -9999 });
    useEffect(() => {
      if (!enabled) return;
      const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
      window.addEventListener("pointermove", handler);
      return () => window.removeEventListener("pointermove", handler);
    }, [enabled]);
    return (
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
        animate={{ x: pos.x - 60, y: pos.y - 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.6 }}
        style={{ width: 120, height: 120 }}
      >
        <div
          className="h-full w-full rounded-full opacity-50 blur-2xl"
          style={{
            background:
              `radial-gradient(40px 40px at 50% 50%, ${color}, transparent 70%)`,
          }}
        />
      </motion.div>
    );
  }