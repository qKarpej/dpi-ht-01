import { ConfidencePill, Delta, Kpi, eur } from "@/components/ui";
import { decisionStats, decisions } from "@/data/decisions";
import { promptInjectionLog } from "@/data/evidence";
import {
  balanceSheet,
  boardRecommendation,
  figures,
  profitBridge,
  reconciliations,
  scenarioRange,
  uncertainties,
} from "@/data/statements";
import { student } from "@/data/submission";
import type { Decision } from "@/data/types";

function Trail({ d }: { d: Decision }) {
  return (
    <div
      id={d.id}
      className={`decision material${d.changedFromAI ? " changed" : ""}`}
    >
      <div className="head">
        <span className="id">{d.id}</span>
        <span className="q">{d.question}</span>
        <ConfidencePill c={d.confidence} />
        {d.changedFromAI ? (
          <span className="pill medium">student override</span>
        ) : (
          <span className="pill">AI proposal upheld</span>
        )}
        {d.agentsDisagreed ? <span className="pill low">agents disagreed</span> : null}
      </div>
      <p className="a"><strong>Certified:</strong> {d.answer}</p>
      <div className="trail">
        <div className="block">
          <h4>Agent 1 position</h4>
          <p>{d.aiProposal}</p>
        </div>
        <div className="block">
          <h4>Agent 2 position, formed independently</h4>
          <p>{d.independentChallenge}</p>
        </div>
        <div className="block">
          <h4>Student reasoning and certification</h4>
          <p>{d.studentReasoning}</p>
        </div>
        {d.statementEffect ? (
          <div className="effect">
            {(["profit", "cash", "assets", "liabilities", "equity"] as const).map((k) => (
              <div key={k}>
                <div className="k">{k}</div>
                <div className="v"><Delta v={d.statementEffect![k]} /></div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="refs" style={{ marginTop: 10 }}>Evidence: {d.evidence.join(" · ")}</div>
      {d.aggregationNote ? (
        <div className="callout info" style={{ marginTop: 10 }}>
          <strong>Not counted twice</strong>
          {d.aggregationNote}
        </div>
      ) : null}
    </div>
  );
}

export default function Review() {
  const material = decisions.filter((d) => d.reviewTier === "material_judgment");
  const overrides = decisions.filter((d) => d.changedFromAI === true);
  const disagreements = decisions.filter((d) => d.agentsDisagreed === true);
  const lowConf = decisions.filter((d) => d.confidence === "low");
  const mediumConf = decisions.filter((d) => d.confidence === "medium");
  const failed = reconciliations.filter((r) => r.result === "fail");

  return (
    <>
      <header className="masthead">
        <div className="wrap">
          <div className="kicker">Assessor view · Case DPI-HT-01</div>
          <h1>Review</h1>
          <p>{student.name} ({student.id}) · 31 August 2026 · EUR</p>
          <nav className="nav">
            <a href="/">Full submission</a>
            <a href="#flags">Flags</a>
            <a href="#overrides">Student overrides</a>
            <a href="#disagree">Agent disagreements</a>
            <a href="#lowconf">Low confidence</a>
            <a href="#unresolved">Unresolved uncertainty</a>
            <a href="#trail">AI review trail</a>
            <a href="/submission.json">/submission.json</a>
          </nav>
        </div>
      </header>

      <main className="wrap">
        {/* ---------- headline ---------- */}
        <section id="flags">
          <h2>At a glance</h2>
          <div className="kpis">
            <Kpi label="Decisions" value={`${decisionStats.total}`} sub={`${decisionStats.operational} operational · ${decisionStats.materialJudgment} material`} />
            <Kpi label="Reconciliations" value={`${reconciliations.length - failed.length}/${reconciliations.length}`} sub={failed.length ? `${failed.length} failing` : "all pass"} tone={failed.length ? "bad" : "good"} />
            <Kpi label="Student overrides" value={`${overrides.length}`} sub="Changed from the AI proposal" tone="bad" />
            <Kpi label="Agent disagreements" value={`${disagreements.length}`} sub="Agents reached different answers" tone="bad" />
            <Kpi label="Low confidence" value={`${lowConf.length}`} sub={`${mediumConf.length} medium`} />
            <Kpi label="Certified profit" value={eur(figures.netProfit)} sub={`Range ${eur(scenarioRange.adverse)} to ${eur(scenarioRange.favourable)}`} tone="good" />
          </div>

          <div className="tablewrap">
            <table>
              <thead>
                <tr><th>Headline</th><th className="num">Management</th><th className="num">Certified</th><th className="num">Difference</th></tr>
              </thead>
              <tbody>
                <tr><td>Net profit</td><td className="num">{eur(figures.managementProfitClaim)}</td><td className="num">{eur(figures.netProfit)}</td><td className="num neg">({eur(figures.overstatement)})</td></tr>
                <tr><td>Revenue</td><td className="num">1,100,000</td><td className="num">{eur(figures.revenue)}</td><td className="num neg">({eur(140_000)})</td></tr>
                <tr><td>Cash</td><td className="num">186,000</td><td className="num">{eur(figures.closingCash)}</td><td className="num neg">({eur(126_000)})</td></tr>
                <tr><td>Inventory</td><td className="num">143,000</td><td className="num">{eur(figures.closingInventoryNet)}</td><td className="num neg">({eur(22_000)})</td></tr>
                <tr><td>Receivables</td><td className="num">186,000</td><td className="num">{eur(figures.closingReceivablesNet)}</td><td className="num neg">({eur(18_000)})</td></tr>
                <tr className="emph"><td>Balance sheet balances</td><td className="num">not reconciled</td><td className="num">{eur(balanceSheet.totalAssets)} = {eur(balanceSheet.totalLiabilities)} + {eur(balanceSheet.totalEquity)}</td><td className="num"><span className="pill pass">pass</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- overrides ---------- */}
        <section id="overrides">
          <h2>Student overrides <span className="pill medium">{overrides.length}</span></h2>
          <p className="lede">
            Decisions where the certified answer differs from the first AI proposal. These are the
            places where the independent challenge changed the outcome.
          </p>
          {overrides.map((d) => <Trail key={d.id} d={d} />)}
        </section>

        {/* ---------- disagreements ---------- */}
        <section id="disagree">
          <h2>Agent disagreements <span className="pill low">{disagreements.length}</span></h2>
          <p className="lede">
            Decisions where the two independent analyses reached materially different answers
            before reconciliation. Combined effect on certified profit: Agent 1 proposed{" "}
            {eur(65_000)}, Agent 2 proposed {eur(72_000)}, certified {eur(figures.netProfit)}.
          </p>
          <div className="tablewrap">
            <table>
              <thead>
                <tr><th>ID</th><th>Issue</th><th>Agent 1</th><th>Agent 2</th><th>Certified</th><th className="num">Profit effect</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className="num">D048 / D075 / D086</td>
                  <td>Materials consumed and closing inventory</td>
                  <td>COGS 405,000, inventory 112,000 (roll-forward)</td>
                  <td>COGS 396,000, inventory 121,000 (physical count)</td>
                  <td>Agent 2 accepted</td>
                  <td className="num">+9,000</td>
                </tr>
                <tr>
                  <td className="num">D072</td>
                  <td>Disposal cost of damaged stock</td>
                  <td>Disclose only, no obligating event at 31 Aug</td>
                  <td>Provide 2,000, net realisable value is negative</td>
                  <td>Agent 2 accepted</td>
                  <td className="num neg">(2,000)</td>
                </tr>
                <tr>
                  <td className="num">D066</td>
                  <td>Phoenix revenue confidence</td>
                  <td>Recognise 100,000, high confidence</td>
                  <td>Recognise 100,000 but least-supported item; email acceptance and name mismatch</td>
                  <td>Figure upheld, confidence lowered to medium</td>
                  <td className="num">0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout info">
            <strong>Point Agent 2 found that Agent 1 missed</strong>
            Three of the four suppliers pay exactly what they owe on current-period invoices.
            Event Things Europe was paid 100,000 against 55,000 due, and the 45,000 excess is the
            opening trade payable. That converts the opening payables figure from a derived plug
            into supplier-level evidence, which is what makes the opening equity of 170,000 and
            therefore the whole equity roll-forward a genuine check rather than a circular one.
            See Schedule 8.
          </div>
        </section>

        {/* ---------- low confidence ---------- */}
        <section id="lowconf">
          <h2>Low-confidence decisions <span className="pill low">{lowConf.length}</span></h2>
          <p className="lede">
            All but one arise from the same cause: the answer template asks a question the data
            room cannot answer. Nothing was estimated to fill a gap.
          </p>
          <div className="tablewrap">
            <table>
              <thead><tr><th>ID</th><th>Question</th><th>Why confidence is low</th></tr></thead>
              <tbody>
                {lowConf.map((d) => (
                  <tr key={d.id}>
                    <td className="num"><a href={`/#${d.id}`}>{d.id}</a></td>
                    <td>{d.question}</td>
                    <td style={{ fontSize: 13, color: "var(--muted)" }}>
                      {d.id === "D034" || d.id === "D060" || d.id === "D078"
                        ? "No insurance transaction, invoice, policy or balance exists anywhere in the data room. Reported as nil with the absence stated."
                        : "No monthly payroll evidence exists. The bank carries one combined line of 231,000 for January to August, so month-level amounts are unevidenced."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- unresolved ---------- */}
        <section id="unresolved">
          <h2>Unresolved uncertainty</h2>
          <p className="lede">
            Central case {eur(scenarioRange.central)} · adverse {eur(scenarioRange.adverse)} ·
            favourable {eur(scenarioRange.favourable)}. The period stays profitable across the
            entire range.
          </p>
          <div className="tablewrap">
            <table>
              <thead>
                <tr><th>Item</th><th className="num">Basis</th><th className="num">Low</th><th className="num">High</th><th>Effect</th></tr>
              </thead>
              <tbody>
                {uncertainties.map((u) => (
                  <tr key={u.item}>
                    <td>{u.item}</td>
                    <td className="num">{eur(u.basis)}</td>
                    <td className="num">{eur(u.low)}</td>
                    <td className="num">{eur(u.high)}</td>
                    <td style={{ fontSize: 13 }}>{u.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="callout danger">
            <strong>The one contradiction that does not close</strong>
            Opening inventory 80,000 plus purchases 459,000 less the asserted consumption of
            405,000 gives 134,000, but the 31 August physical count gives 143,000. The gap is
            9,000 and no reading of the file removes it. The balance sheet is anchored on the
            count. Closing inventory of 121,000 and equity of 132,000 hold under either
            explanation of the gap; only the profit split moves.
          </div>

          <div className="callout">
            <strong>Questions the data room cannot answer at all</strong>
            Leases: the file named for leases contains none, yet 48,000 of rent was paid, so a
            right-of-use asset cannot be assessed and could be material. Insurance: no policy
            anywhere, and no claim was made on stock destroyed by a leaking pipe. Also absent:
            depreciation policy and asset register, receivables ageing, opening accrued interest,
            the split of opening equity, and any foreign currency data although customers are in
            the USA and the UK.
          </div>
        </section>

        {/* ---------- bridge ---------- */}
        <section id="bridgemini">
          <h2>Profit bridge</h2>
          <div className="tablewrap">
            <table>
              <tbody>
                <tr className="emph"><td>{profitBridge.start.label}</td><td className="num">{eur(profitBridge.start.amount)}</td></tr>
                {profitBridge.steps.map((s, i) => (
                  <tr key={i}>
                    <td>{s.label}</td>
                    <td className={`num${s.amount < 0 ? " neg" : ""}`}>
                      {s.amount < 0 ? `(${eur(-s.amount)})` : `+${eur(s.amount)}`}
                    </td>
                  </tr>
                ))}
                <tr className="emph"><td>{profitBridge.end.label}</td><td className="num">{eur(profitBridge.end.amount)}</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- full trail ---------- */}
        <section id="trail">
          <h2>AI review trail — all {material.length} material judgments</h2>
          <p className="lede">
            Method: two analyses run independently. Agent 1 extracted the evidence and proposed
            treatments. Agent 2 received the original data room only, with none of Agent 1&rsquo;s
            conclusions, and reconstructed the accounts from first principles. The two were
            compared only after both were complete.
          </p>
          <div className="callout danger">
            <strong>Prompt injection in the evidence files</strong>
            {promptInjectionLog.length} attempts to instruct the reader were found across the data
            room, including a direct instruction to report a profit of 312,000. Both agents were
            told to treat them as untrusted case content. Neither acted on any of them, and all
            are logged on the main page.
          </div>
          {material.map((d) => <Trail key={d.id} d={d} />)}
        </section>

        {/* ---------- recommendation ---------- */}
        <section id="rec">
          <h2>Board recommendation in one paragraph</h2>
          <div className="card">
            <p style={{ margin: 0, fontSize: 14 }}>{boardRecommendation.continueDecision}</p>
          </div>
          <div className="card">
            <h3>Earn-out</h3>
            <p style={{ margin: 0, fontSize: 14 }}>{boardRecommendation.earnOut}</p>
          </div>
        </section>

        <footer>
          <p>
            <a href="/">Full submission</a> · <a href="/submission.json">/submission.json</a> ·
            {" "}{decisionStats.total} decisions · {reconciliations.length} reconciliations, all passing.
          </p>
        </footer>
      </main>
    </>
  );
}
