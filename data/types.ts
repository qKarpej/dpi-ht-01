export type Confidence = "low" | "medium" | "high";
export type ReviewTier = "operational" | "material_judgment";
export type Category =
  | "evidence_matching"
  | "classification"
  | "estimation"
  | "board_decision";

export interface StatementEffect {
  profit: number | null;
  cash: number | null;
  assets: number | null;
  liabilities: number | null;
  equity: number | null;
}

export interface Decision {
  id: string;
  category: Category;
  reviewTier: ReviewTier;
  question: string;
  answer: string;
  evidence: string[];
  confidence: Confidence;
  /** Material judgments only. */
  aiProposal?: string;
  independentChallenge?: string;
  studentReasoning?: string;
  statementEffect?: StatementEffect;
  changedFromAI?: boolean;
  /**
   * Set when this decision restates an adjustment whose statement effect is
   * already carried by another decision. Used so the profit bridge never
   * double-counts the same euro.
   */
  aggregationNote?: string;
  agentsDisagreed?: boolean;
}

export interface EvidenceItem {
  ref: string;
  file: string;
  description: string;
  reliability: 1 | 2 | 3 | 4 | 5 | 6;
  reliabilityLabel: string;
}

export interface ScheduleLine {
  label: string;
  amount: number | null;
  note?: string;
  emphasis?: boolean;
}

export interface Schedule {
  key: string;
  title: string;
  lines: ScheduleLine[];
  check?: string;
}

export interface Reconciliation {
  name: string;
  requirement: string;
  computation: string;
  result: "pass" | "fail";
}

export interface Uncertainty {
  item: string;
  basis: number;
  low: number;
  high: number;
  effect: string;
  treatment: string;
}
