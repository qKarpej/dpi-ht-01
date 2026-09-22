import { decisions } from "./decisions";
import { evidence, promptInjectionLog } from "./evidence";
import {
  balanceSheet,
  boardRecommendation,
  cashFlow,
  figures,
  openingBalanceSheet,
  profitAndLoss,
  profitBridge,
  reconciliations,
  scenarioRange,
  schedules,
  uncertainties,
} from "./statements";

export const student = {
  id: "220591",
  name: "Aleksejs Pjavka",
};

/**
 * The machine-readable answer served at /submission.json.
 * Shape follows "02 GIVE TO CODEX - Submission Rules.json".
 */
export function buildSubmission() {
  return {
    schemaVersion: "1.0" as const,
    caseId: "DPI-HT-01" as const,
    student,
    reportingDate: "2026-08-31",
    currency: "EUR",

    evidence: evidence.map((e) => ({
      ref: e.ref,
      file: e.file,
      description: e.description,
      reliabilityRank: e.reliability,
      reliabilityLabel: e.reliabilityLabel,
    })),

    decisions: decisions.map((d) => {
      const base: Record<string, unknown> = {
        id: d.id,
        category: d.category,
        reviewTier: d.reviewTier,
        question: d.question,
        answer: d.answer,
        evidence: d.evidence,
        confidence: d.confidence,
      };
      if (d.reviewTier === "material_judgment") {
        base.aiProposal = d.aiProposal;
        base.independentChallenge = d.independentChallenge;
        base.studentReasoning = d.studentReasoning;
        base.statementEffect = d.statementEffect;
        base.changedFromAI = d.changedFromAI;
      }
      if (d.aggregationNote) base.aggregationNote = d.aggregationNote;
      if (d.agentsDisagreed !== undefined) base.agentsDisagreed = d.agentsDisagreed;
      return base;
    }),

    schedules: Object.fromEntries(
      schedules.map((s) => [
        s.key,
        { title: s.title, lines: s.lines, check: s.check },
      ]),
    ),

    statements: {
      profitAndLoss: {
        title: profitAndLoss.title,
        lines: profitAndLoss.lines,
        revenue: figures.revenue,
        grossProfit: figures.grossProfit,
        grossMarginPct: profitAndLoss.grossMarginPct,
        operatingProfit: figures.operatingProfit,
        netProfit: figures.netProfit,
      },
      cashFlow: {
        title: cashFlow.title,
        sections: cashFlow.sections,
        netChange: cashFlow.netChange,
        opening: cashFlow.opening,
        closing: cashFlow.closing,
        presentationNote: cashFlow.presentationNote,
      },
      balanceSheet: {
        title: balanceSheet.title,
        assets: balanceSheet.assets,
        totalAssets: balanceSheet.totalAssets,
        liabilities: balanceSheet.liabilities,
        totalLiabilities: balanceSheet.totalLiabilities,
        equity: balanceSheet.equity,
        totalEquity: balanceSheet.totalEquity,
        balances:
          balanceSheet.totalAssets ===
          balanceSheet.totalLiabilities + balanceSheet.totalEquity,
      },
      openingBalanceSheet,
    },

    profitBridge,

    reconciliations: reconciliations.map((r) => ({
      name: r.name,
      requirement: r.requirement,
      computation: r.computation,
      result: r.result,
    })),

    uncertainties: uncertainties.map((u) => ({
      item: u.item,
      basis: u.basis,
      low: u.low,
      high: u.high,
      effect: u.effect,
      treatment: u.treatment,
    })),

    scenarioRange,

    boardRecommendation,

    aiReviewTrail: {
      method:
        "Two analyses were run independently. Agent 1 extracted the evidence and proposed treatments. Agent 2 received the original data room only, with none of Agent 1's conclusions, and produced its own reconstruction from first principles. The two were compared afterwards and every material judgment was certified by the student.",
      materialJudgments: decisions.filter((d) => d.reviewTier === "material_judgment").length,
      changedFromAI: decisions.filter((d) => d.changedFromAI === true).map((d) => d.id),
      agentDisagreements: decisions.filter((d) => d.agentsDisagreed === true).map((d) => d.id),
      lowConfidence: decisions.filter((d) => d.confidence === "low").map((d) => d.id),
      promptInjectionAttempts: promptInjectionLog,
    },
  };
}
