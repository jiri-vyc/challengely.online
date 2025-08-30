export function StatCard({ label, value, className = "" }) {
    return (
      <div className={`overflow-hidden rounded-3xl border border-foreground/10 bg-background/60 p-4 ${className}`}>
        <div className="text-xs uppercase tracking-wider text-foreground/60">{label}</div>
        <div className="text-3xl font-black leading-tight">{value}</div>
      </div>
    );
  }