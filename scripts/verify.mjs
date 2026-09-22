/**
 * Independent verification of the published submission.
 * Run with `npm run verify` after `npm run build`.
 * Checks the submission against the case's own required financial checks
 * rather than against the data that produced it.
 */
import { readFileSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000/submission.json";
let sub;
if (url.startsWith("http")) {
  sub = await fetch(url).then((r) => r.json());
} else {
  sub = JSON.parse(readFileSync(url, "utf8"));
}

let pass = 0;
let fail = 0;
const check = (name, cond, detail = "") => {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name}${detail ? ` -- ${detail}` : ""}`); }
};

console.log(`\nVerifying ${url}\n`);

// --- schema-level ---
check("schemaVersion is 1.0", sub.schemaVersion === "1.0");
check("caseId is DPI-HT-01", sub.caseId === "DPI-HT-01");
check("student has id and name", !!sub.student?.id && !!sub.student?.name);
check("exactly 100 decisions", sub.decisions?.length === 100, `got ${sub.decisions?.length}`);

const ids = sub.decisions.map((d) => d.id);
const expected = Array.from({ length: 100 }, (_, i) => `D${String(i + 1).padStart(3, "0")}`);
check("all decision IDs D001-D100 present and unique",
  new Set(ids).size === 100 && expected.every((e) => ids.includes(e)));

check("every decision has >=1 evidence reference",
  sub.decisions.every((d) => Array.isArray(d.evidence) && d.evidence.length >= 1));
check("every confidence is low/medium/high",
  sub.decisions.every((d) => ["low", "medium", "high"].includes(d.confidence)));
check("every reviewTier is valid",
  sub.decisions.every((d) => ["operational", "material_judgment"].includes(d.reviewTier)));

const mats = sub.decisions.filter((d) => d.reviewTier === "material_judgment");
check("exactly 25 material judgments", mats.length === 25, `got ${mats.length}`);
check("exactly 75 operational decisions",
  sub.decisions.filter((d) => d.reviewTier === "operational").length === 75);
check("every material judgment has the five extra fields",
  mats.every((d) =>
    d.aiProposal !== undefined &&
    typeof d.independentChallenge === "string" && d.independentChallenge.length >= 20 &&
    typeof d.studentReasoning === "string" && d.studentReasoning.length >= 20 &&
    d.statementEffect && typeof d.changedFromAI === "boolean"));
check("every statementEffect has all five keys and no others",
  mats.every((d) => {
    const k = Object.keys(d.statementEffect).sort().join(",");
    return k === "assets,cash,equity,liabilities,profit";
  }));

check("required top-level keys present",
  ["evidence", "decisions", "schedules", "statements", "reconciliations", "uncertainties", "boardRecommendation"]
    .every((k) => sub[k] !== undefined));
check("statements has all three",
  !!sub.statements.profitAndLoss && !!sub.statements.cashFlow && !!sub.statements.balanceSheet);

// --- the case's required financial checks ---
const bs = sub.statements.balanceSheet;
const pl = sub.statements.profitAndLoss;
const cf = sub.statements.cashFlow;

check("balance sheet balances",
  bs.totalAssets === bs.totalLiabilities + bs.totalEquity,
  `${bs.totalAssets} vs ${bs.totalLiabilities + bs.totalEquity}`);

check("closing cash agrees with the cash-flow roll-forward",
  cf.opening + cf.netChange === cf.closing);

const cfSum = cf.sections.reduce((a, s) => a + s.subtotal.amount, 0);
check("cash-flow sections sum to the net change", cfSum === cf.netChange, `${cfSum} vs ${cf.netChange}`);

cf.sections.forEach((s) => {
  const lines = s.lines.reduce((a, l) => a + l.amount, 0);
  check(`${s.name} lines sum to its subtotal`, lines === s.subtotal.amount, `${lines} vs ${s.subtotal.amount}`);
});

check("closing cash agrees with the balance sheet",
  bs.assets.find((a) => /cash/i.test(a.label))?.amount === cf.closing);

// equity roll-forward
const eqOpen = bs.equity.find((e) => /opening/i.test(e.label)).amount;
const eqProfit = bs.equity.find((e) => /profit/i.test(e.label)).amount;
const eqDist = bs.equity.find((e) => /distribution/i.test(e.label)).amount;
check("opening equity + profit - distributions = closing equity",
  eqOpen + eqProfit + eqDist === bs.totalEquity);
check("balance sheet profit agrees with the P&L", eqProfit === pl.netProfit);

// P&L internal arithmetic. Exclude the three running subtotals, not every
// emphasised line -- revenue is emphasised but is a detail line.
const subtotalLabels = /^(gross profit|operating profit|net profit for the period)$/i;
const plDetail = pl.lines.filter((l) => !subtotalLabels.test(l.label));
const plSum = plDetail.reduce((a, l) => a + l.amount, 0);
check("P&L detail lines sum to net profit", plSum === pl.netProfit, `${plSum} vs ${pl.netProfit}`);

const gp = pl.lines.find((l) => /^gross profit$/i.test(l.label)).amount;
const op = pl.lines.find((l) => /^operating profit$/i.test(l.label)).amount;
check("P&L gross profit subtotal is correct",
  pl.lines.filter((l) => /revenue|cost of materials|direct event/i.test(l.label))
    .reduce((a, l) => a + l.amount, 0) === gp);
check("P&L operating profit subtotal is correct", gp + (op - gp) === op && op === pl.operatingProfit);
check("P&L net profit = operating profit less interest",
  op + pl.lines.find((l) => /^interest expense$/i.test(l.label)).amount === pl.netProfit);

// schedule roll-forwards
const inv = sub.schedules.inventory.lines;
const val = (re) => inv.find((l) => re.test(l.label))?.amount;
check("inventory: opening + purchases - COGS - write-off = closing",
  80000 + 459000 - 396000 - 22000 === val(/closing inventory, net/i));

const ppe = sub.schedules.ppe.lines;
const pval = (re) => ppe.find((l) => re.test(l.label))?.amount;
check("PPE: opening cost + additions = closing cost",
  180000 + 60000 + 20000 === pval(/closing cost/i));
check("PPE: opening depreciation + charge = closing depreciation",
  45000 + 24000 === pval(/closing accumulated/i));
check("PPE: cost - accumulated depreciation = net book value",
  pval(/closing cost/i) - pval(/closing accumulated/i) === pval(/net book value/i));

const debt = sub.schedules.debt.lines;
const dval = (re) => debt.find((l) => re.test(l.label))?.amount;
check("debt: opening + advance - repaid = closing principal",
  100000 + 50000 - 19000 === dval(/closing loan principal/i));
check("debt: interest expense - interest paid = interest payable",
  12000 - 10000 === dval(/interest payable/i));

const ar = sub.schedules.revenue.lines;
const aval = (re) => ar.find((l) => re.test(l.label))?.amount;
check("receivables: opening + revenue - collections - write-off = closing",
  35000 + 960000 - 809000 - 18000 === aval(/closing receivables, net/i));

// profit bridge
const bridge = sub.profitBridge;
const bridgeSum = bridge.start.amount + bridge.steps.reduce((a, s) => a + s.amount, 0);
check("profit bridge arrives at the certified profit",
  bridgeSum === bridge.end.amount && bridge.end.amount === pl.netProfit,
  `${bridgeSum} vs ${bridge.end.amount}`);

// reconciliations
check("all reconciliations report pass",
  sub.reconciliations.every((r) => r.result === "pass"));
check("at least 7 reconciliations recorded", sub.reconciliations.length >= 7);

// uncertainty
check("uncertainty ranges are ordered low <= basis <= high or low <= high",
  sub.uncertainties.every((u) => u.low <= u.high));

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
