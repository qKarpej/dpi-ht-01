import type { Confidence } from "@/data/types";

export const eur = (n: number) =>
  new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 }).format(n);

/** Signed money, for statement lines where the sign carries meaning. */
export function Money({ v }: { v: number }) {
  if (v === 0) return <span>-</span>;
  return <span className={v < 0 ? "neg" : undefined}>{v < 0 ? `(${eur(-v)})` : eur(v)}</span>;
}

/** Explicit +/- delta, for statement-effect tiles. */
export function Delta({ v }: { v: number | null }) {
  if (v === null) return <span style={{ color: "var(--muted)" }}>n/a</span>;
  if (v === 0) return <span style={{ color: "var(--muted)" }}>0</span>;
  return <span className={v < 0 ? "neg" : undefined}>{v > 0 ? `+${eur(v)}` : `(${eur(-v)})`}</span>;
}

export function ConfidencePill({ c }: { c: Confidence }) {
  return <span className={`pill ${c}`}>{c} confidence</span>;
}

export function Kpi({
  label, value, sub, tone,
}: {
  label: string; value: string; sub?: string; tone?: "good" | "bad";
}) {
  return (
    <div className={`kpi${tone ? ` ${tone}` : ""}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {sub ? <div className="sub">{sub}</div> : null}
    </div>
  );
}
