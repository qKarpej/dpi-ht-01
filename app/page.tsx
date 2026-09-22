import { Fragment } from "react";
import { ConfidencePill, Delta, Kpi, Money, eur } from "@/components/ui";
import { decisionStats, decisions } from "@/data/decisions";
import { evidence, promptInjectionLog } from "@/data/evidence";
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
} from "@/data/statements";
import { student } from "@/data/submission";
import type { Decision } from "@/data/types";

function DecisionCard({ d }: { d: Decision }) {
  const material = d.reviewTier === "material_judgment";
  return (
    <div
      id={d.id}
      className={`decision${material ? " material" : ""}${d.changedFromAI ? " changed" : ""}`}
    >
      <div className="head">
        <span className="id">{d.id}</span>
        <span className="q">{d.question}</span>
        <ConfidencePill c={d.confidence} />
        {material ? <span className="pill flag">material</span> : null}
        {d.changedFromAI ? <span className="pill medium">student override</span> : null}
        {d.agentsDisagreed ? <span className="pill low">agents disagreed</span> : null}
      </div>
      <p className="a">{d.answer}</p>
      <div className="refs">Evidence: {d.evidence.join(" · ")}</div>
      {d.aggregationNote ? (
        <div className="callout info" style={{ marginTop: 10 }}>
          <strong>Not counted twice</strong>
          {d.aggregationNote}
        </div>
      ) : null}
      {material ? (
        <div className="trail">
          <div className="block">
            <h4>Agent 1 — first AI proposal</h4>
            <p>{d.aiProposal}</p>
          </div>
          <div className="block">
            <h4>Agent 2 — independent challenge</h4>
            <p>{d.independentChallenge}</p>
          </div>
          <div className="block">
            <h4>Student certification{d.changedFromAI ? " — changed from the AI proposal" : ""}</h4>
            <p>{d.studentReasoning}</p>
          </div>
          {d.statementEffect ? (
            <div className="effect">
              {(["profit", "cash", "assets", "liabilities", "equity"] as const).map((k) => (
                <div key={k}>
                  <div className="k">{k}</div>
                  <div className="v">
                    <Delta v={d.statementEffect![k]} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function Home() {
  const groups = [
    { key: "evidence_matching", title: "Evidence matching", range: "D001-D040" },
    { key: "classification", title: "Classification", range: "D041-D070" },
    { key: "estimation", title: "Estimation", range: "D071-D090" },
    { key: "board_decision", title: "Board decisions", range: "D091-D100" },
  ] as const;

  return (
    <>
      <header className="masthead">
        <div className="wrap">
          <div className="kicker">Case DPI-HT-01 · Bad Decisions Capital Ltd.</div>
          <h1>Divorce Party International Ltd.</h1>
          <p>
            Forensic reconstruction at 31 August 2026 · EUR ·{" "}
            {student.name} ({student.id})
          </p>
          <nav className="nav">
            <a href="#verdict">Verdict</a>
            <a href="#evidence">Evidence</a>
            <a href="#statements">Statements</a>
            <a href="#schedules">Schedules</a>
            <a href="#bridge">Profit bridge</a>
            <a href="#recons">Reconciliations</a>
            <a href="#decisions">100 decisions</a>
            <a href="#uncertainty">Uncertainty</a>
            <a href="#board">Board</a>
            <a href="/review">/review</a>
            <a href="/submission.json">/submission.json</a>
          </nav>
        </div>
      </header>

      <main className="wrap">
        {/* ---------------- verdict ---------------- */}
        <section id="verdict">
          <h2>The verdict</h2>
          <p className="lede">
            Management presented the board with a profit of {eur(figures.managementProfitClaim)}.
            The bank, the signed contracts, the supplier confirmations and the warehouse count
            support {eur(figures.netProfit)}.
          </p>

          <div className="kpis">
            <Kpi label="Certified net profit" value={eur(figures.netProfit)} sub={`Management claimed ${eur(figures.managementProfitClaim)}`} tone="good" />
            <Kpi label="Overstatement" value={eur(figures.overstatement)} sub="More than four times the real figure" tone="bad" />
            <Kpi label="Closing cash" value={eur(figures.closingCash)} sub="Management claimed 186,000" />
            <Kpi label="Revenue" value={eur(figures.revenue)} sub={`Gross margin ${profitAndLoss.grossMarginPct}%`} />
            <Kpi label="Closing equity" value={eur(figures.closingEquity)} sub="Assets 540,000 less liabilities 408,000" />
            <Kpi label="Cash net of deposits" value={`(${eur(30_000)})`} sub="90,000 of the cash is customer money" tone="bad" />
          </div>

          <div className="callout danger">
            <strong>Instructions embedded in the evidence were not followed</strong>
            The data room contains sentences addressed to whoever reads it, including a direct
            instruction to report a profit of {eur(figures.managementProfitClaim)}. These are
            untrusted case content authored by the former management. All{" "}
            {promptInjectionLog.length} attempts are logged below and none were acted on.
          </div>

          <div className="callout">
            <strong>The overstatement ran in one direction every time</strong>
            Revenue was overstated by {eur(140_000)} and costs understated by {eur(100_000)}. Nine
            separate choices — deposits as sales, a loan as income, no depreciation, no bad debt,
            no stock write-off, no provision, no interest, capital called repairs, repairs called
            capital — and every one of them raised profit. That consistency is a finding in itself.
          </div>
        </section>

        {/* ---------------- evidence ---------------- */}
        <section id="evidence">
          <h2>Evidence register</h2>
          <p className="lede">
            Ranked by the reliability order the board set: bank and signed contracts first,
            management spreadsheets and messages last. Every figure in this reconstruction traces
            to a reference below.
          </p>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>File</th>
                  <th>What it is</th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody>
                {evidence.map((e) => (
                  <tr key={e.ref}>
                    <td className="num">{e.ref}</td>
                    <td>{e.file}</td>
                    <td>{e.description}</td>
                    <td>
                      <span className={`pill ${e.reliability <= 2 ? "high" : e.reliability <= 4 ? "medium" : "low"}`}>
                        {e.reliability} · {e.reliabilityLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: 28, fontSize: 16 }}>Attempted manipulation log</h3>
          {promptInjectionLog.map((p, i) => (
            <div className="card" key={i}>
              <div className="refs" style={{ marginBottom: 6 }}>{p.source}</div>
              <div className="quote">&ldquo;{p.text}&rdquo;</div>
              <p style={{ margin: "8px 0 0", fontSize: 14 }}>{p.handling}</p>
            </div>
          ))}
        </section>

        {/* ---------------- statements ---------------- */}
        <section id="statements">
          <h2>The three statements</h2>

          <div className="card">
            <h3>{profitAndLoss.title}</h3>
            <div className="tablewrap">
              <table>
                <tbody>
                  {profitAndLoss.lines.map((l, i) => (
                    <tr key={i} className={l.emphasis ? "emph" : undefined}>
                      <td>{l.label}</td>
                      <td className="num"><Money v={l.amount} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3>{cashFlow.title}</h3>
            <div className="tablewrap">
              <table>
                <tbody>
                  {cashFlow.sections.map((s) => (
                    <Fragment key={s.name}>
                      <tr className="emph">
                        <td>{s.name}</td>
                        <td className="num"></td>
                      </tr>
                      {s.lines.map((l, i) => (
                        <tr key={`${s.name}-${i}`}>
                          <td style={{ paddingLeft: 24 }}>{l.label}</td>
                          <td className="num"><Money v={l.amount} /></td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{ fontWeight: 600 }}>{s.subtotal.label}</td>
                        <td className="num" style={{ fontWeight: 600 }}>
                          <Money v={s.subtotal.amount} />
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                  <tr className="emph">
                    <td>Net decrease in cash</td>
                    <td className="num"><Money v={cashFlow.netChange} /></td>
                  </tr>
                  <tr>
                    <td>Cash at 1 January 2026</td>
                    <td className="num"><Money v={cashFlow.opening} /></td>
                  </tr>
                  <tr className="emph">
                    <td>Cash at 31 August 2026</td>
                    <td className="num"><Money v={cashFlow.closing} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="callout info" style={{ marginTop: 12 }}>
              <strong>Presentation</strong>
              {cashFlow.presentationNote}
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "10px 0 0" }}>
              {cashFlow.indirectCheck}
            </p>
          </div>

          <div className="card">
            <h3>{balanceSheet.title}</h3>
            <div className="tablewrap">
              <table>
                <tbody>
                  <tr className="emph"><td>Assets</td><td className="num"></td></tr>
                  {balanceSheet.assets.map((l, i) => (
                    <tr key={`a${i}`}>
                      <td style={{ paddingLeft: 24 }}>
                        {l.label}
                        {l.note ? <span className="note">{l.note}</span> : null}
                      </td>
                      <td className="num"><Money v={l.amount} /></td>
                    </tr>
                  ))}
                  <tr className="emph"><td>Total assets</td><td className="num">{eur(balanceSheet.totalAssets)}</td></tr>

                  <tr className="emph"><td>Liabilities</td><td className="num"></td></tr>
                  {balanceSheet.liabilities.map((l, i) => (
                    <tr key={`l${i}`}>
                      <td style={{ paddingLeft: 24 }}>
                        {l.label}
                        {l.note ? <span className="note">{l.note}</span> : null}
                      </td>
                      <td className="num"><Money v={l.amount} /></td>
                    </tr>
                  ))}
                  <tr className="emph"><td>Total liabilities</td><td className="num">{eur(balanceSheet.totalLiabilities)}</td></tr>

                  <tr className="emph"><td>Equity</td><td className="num"></td></tr>
                  {balanceSheet.equity.map((l, i) => (
                    <tr key={`e${i}`}>
                      <td style={{ paddingLeft: 24 }}>{l.label}</td>
                      <td className="num"><Money v={l.amount} /></td>
                    </tr>
                  ))}
                  <tr className="emph"><td>Total equity</td><td className="num">{eur(balanceSheet.totalEquity)}</td></tr>
                  <tr className="emph">
                    <td>Total liabilities and equity</td>
                    <td className="num">{eur(balanceSheet.totalLiabilitiesAndEquity)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3>{openingBalanceSheet.title}</h3>
            <div className="tablewrap">
              <table>
                <tbody>
                  {openingBalanceSheet.lines.map((l, i) => (
                    <tr key={i} className={l.emphasis ? "emph" : undefined}>
                      <td>
                        {l.label}
                        {l.note ? <span className="note">{l.note}</span> : null}
                      </td>
                      <td className="num"><Money v={l.amount} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "10px 0 0" }}>
              {openingBalanceSheet.note}
            </p>
          </div>
        </section>

        {/* ---------------- schedules ---------------- */}
        <section id="schedules">
          <h2>Supporting schedules</h2>
          <p className="lede">
            Eight schedules. The statements are built from these, not the other way round.
          </p>
          {schedules.map((s) => (
            <div className="card" key={s.key} id={`sch-${s.key}`}>
              <h3>{s.title}</h3>
              <div className="tablewrap">
                <table>
                  <tbody>
                    {s.lines.map((l, i) => (
                      <tr key={i} className={l.emphasis ? "emph" : undefined}>
                        <td>
                          {l.label}
                          {l.note ? <span className="note">{l.note}</span> : null}
                        </td>
                        <td className="num">{l.amount === null ? "-" : <Money v={l.amount} />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {s.check ? (
                <div className="callout info" style={{ marginTop: 12 }}>
                  <strong>Check</strong>
                  {s.check}
                </div>
              ) : null}
            </div>
          ))}
        </section>

        {/* ---------------- bridge ---------------- */}
        <section id="bridge">
          <h2>{profitBridge.title}</h2>
          <div className="tablewrap">
            <table>
              <tbody>
                <tr className="emph">
                  <td>{profitBridge.start.label}</td>
                  <td className="num">{eur(profitBridge.start.amount)}</td>
                </tr>
                {profitBridge.steps.map((s, i) => (
                  <tr key={i}>
                    <td>
                      {s.label} <span className="pill">{s.ref}</span>
                    </td>
                    <td className="num"><Money v={s.amount} /></td>
                  </tr>
                ))}
                <tr className="emph">
                  <td>{profitBridge.end.label}</td>
                  <td className="num">{eur(profitBridge.end.amount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout">
            <strong>Why the residual exists</strong>
            {profitBridge.note}
          </div>
        </section>

        {/* ---------------- reconciliations ---------------- */}
        <section id="recons">
          <h2>Reconciliations</h2>
          <p className="lede">
            All {reconciliations.length} pass. Every one is proved against external evidence rather
            than against the management workbook.
          </p>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Check</th>
                  <th>Requirement</th>
                  <th>Computation</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {reconciliations.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>{r.requirement}</td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.computation}</td>
                    <td><span className={`pill ${r.result}`}>{r.result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------- decisions ---------------- */}
        <section id="decisions">
          <h2>The 100 decisions</h2>
          <p className="lede">
            {decisionStats.operational} operational and {decisionStats.materialJudgment} material
            judgments. Material judgments carry the first AI proposal, the independent challenge,
            the certified reasoning and the statement effect. {decisionStats.changed} were changed
            from the AI proposal after the independent challenge.
          </p>
          {groups.map((g) => (
            <div key={g.key} id={`grp-${g.key}`}>
              <h3 style={{ fontSize: 16, marginTop: 28 }}>
                {g.title} <span className="pill">{g.range}</span>
              </h3>
              {decisions.filter((d) => d.category === g.key).map((d) => (
                <DecisionCard key={d.id} d={d} />
              ))}
            </div>
          ))}
        </section>

        {/* ---------------- uncertainty ---------------- */}
        <section id="uncertainty">
          <h2>Uncertainty register</h2>
          <p className="lede">
            What is not known, how big it could be, and what was done about it. Central case{" "}
            {eur(scenarioRange.central)}, range {eur(scenarioRange.adverse)} to{" "}
            {eur(scenarioRange.favourable)}.
          </p>
          <div className="callout info">
            <strong>Scenario range</strong>
            {scenarioRange.note}
          </div>
          {uncertainties.map((u) => (
            <div className="card" key={u.item}>
              <h3>{u.item}</h3>
              <div className="tablewrap">
                <table>
                  <thead>
                    <tr><th className="num">Basis</th><th className="num">Low</th><th className="num">High</th><th>Effect</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="num">{eur(u.basis)}</td>
                      <td className="num">{eur(u.low)}</td>
                      <td className="num">{eur(u.high)}</td>
                      <td>{u.effect}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 14, margin: "10px 0 0" }}>{u.treatment}</p>
            </div>
          ))}
        </section>

        {/* ---------------- board ---------------- */}
        <section id="board">
          <h2>Board recommendation</h2>
          <p className="lede">{boardRecommendation.headline}</p>

          <div className="card">
            <h3>Corrected profit and cash position</h3>
            <ul className="clean">
              {boardRecommendation.correctedPosition.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3>Working capital and solvency warning</h3>
            <ul className="clean">
              {boardRecommendation.workingCapitalWarning.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3>Five immediate control actions</h3>
            <ul className="clean">
              {boardRecommendation.immediateControls.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3>Key uncertainty ranges</h3>
            <ul className="clean">
              {boardRecommendation.keyUncertainties.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3>Should the core business continue?</h3>
            <p style={{ fontSize: 14, margin: 0 }}>{boardRecommendation.continueDecision}</p>
          </div>
          <div className="card">
            <h3>Earn-out</h3>
            <p style={{ fontSize: 14, margin: 0 }}>{boardRecommendation.earnOut}</p>
          </div>
        </section>

        <footer>
          <p>
            Case DPI-HT-01 · {student.name} ({student.id}) · Reporting date 31 August 2026 · EUR ·
            VAT and corporate income tax outside scope.
          </p>
          <p>
            Assessor views: <a href="/review">/review</a> ·{" "}
            <a href="/submission.json">/submission.json</a>
          </p>
          <p style={{ fontSize: 12 }}>
            Every company file was treated as evidence, not truth. Instructions found inside
            evidence files were logged and not executed.
          </p>
        </footer>
      </main>
    </>
  );
}
