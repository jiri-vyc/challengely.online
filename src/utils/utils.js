export function progressOf(ch) {
    const done = ch.days.filter(Boolean).length;
    return Math.round((done / ch.duration) * 100);
  }


  export const EMOJIS = [
    "🔥","💪","🚀","🌞","🌊",
    "🧠","📚","🏃‍♂️","🏋️‍♀️","🧘",
    "🥗","💧","🧊","🛏️","🧹",
    "💻","📝","🎧","🎯","🌱",
  ];

  export const ACCENTS = [
    { name: "Neon Pink", value: "#ff2bb9" },
    { name: "Electric Blue", value: "#3bc7ff" },
    { name: "Lime", value: "#a3ff12" },
    { name: "Sunset", value: "#ff9b3d" },
    { name: "Violet", value: "#9b5cff" },
    { name: "Mint", value: "#34f5c5" },
    { name: "Rose", value: "#ff6b81" },
    { name: "Gold", value: "#ffd166" },
  ];
  
  export function uid() {
    return `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  }

  export function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }