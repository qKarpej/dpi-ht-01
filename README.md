# DPI-HT-01 — Divorce Party International Ltd.

Forensic reconstruction of the accounts at **31 August 2026** following the hostile
takeover by Bad Decisions Capital Ltd.

Management claimed a profit of **EUR 312,000**. The certified result is **EUR 72,000**.

| | Management | Certified |
|---|---:|---:|
| Revenue | 1,100,000 | 960,000 |
| Net profit | 312,000 | 72,000 |
| Cash | 186,000 | 60,000 |
| Balance sheet | not reconciled | 540,000 = 408,000 + 132,000 |

## Routes

| Route | What it is |
|---|---|
| `/` | Full submission: evidence, 100 decisions, schedules, three statements, profit bridge, reconciliations, uncertainty, board recommendation |
| `/review` | Compact assessor view: flags, student overrides, agent disagreements, low-confidence decisions, unresolved uncertainty, full AI review trail |
| `/submission.json` | Machine-readable answer, conforming to the supplied submission rules |

## Method

Two AI analyses were run **independently**. Agent 1 extracted the evidence and proposed
treatments. Agent 2 received the original data room only — none of Agent 1's conclusions —
and reconstructed the accounts from first principles. The two were compared only after both
were complete, and every material judgment was then certified by the student.

The independent challenge changed the answer on **4 of the 25 material judgments**
(D048, D066, D072, D075), moving certified profit from 65,000 to 72,000.

One line in that result is an assumption rather than a required accrual. The 2,000 disposal
provision at **D072** is retained for conservatism even though no present legal or constructive
obligation is evidenced at 31 August, so IAS 37 does not compel it. It is labelled as such
throughout, and the no-provision alternative — disclosing the cost instead of accruing it — is
set out at **U-10**: net profit 74,000, liabilities 406,000, equity 134,000, balance sheet still
balancing at 540,000.

Some evidence files contain sentences that attempt to instruct whoever reads them, including
a direct instruction to report a profit of 312,000. These are untrusted case content. All
seven attempts are logged on the main page and none were acted on.

## Verification

```bash
npm install
npm run build
npm start          # then, in another shell:
npm run verify     # 38 checks against /submission.json
```

`scripts/verify.mjs` re-derives every roll-forward from the published JSON rather than from
the source data, so it fails if the statements and the schedules ever drift apart. It covers
the schema (100 decision IDs, 25 material judgments with all five extra fields) and all of
the case's required financial checks.

## Project layout

```
data/          the reconstruction, as typed static data
  evidence.ts     evidence register + attempted-manipulation log
  decisions.ts    all 100 decisions with the AI review trail
  statements.ts   schedules, three statements, bridge, reconciliations, uncertainty
  submission.ts   assembles /submission.json
app/           three routes
scripts/       verify.mjs
```

No login, database or paid API. The case is static project data.
