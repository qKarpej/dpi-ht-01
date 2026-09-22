import type { Reconciliation, Schedule, Uncertainty } from "./types";

/* ------------------------------------------------------------------ *
 * Certified figures at 31 August 2026.
 *
 * These are the student-certified positions AFTER the independent
 * second-agent challenge. Two figures moved as a result of that
 * challenge: cost of materials (405,000 -> 396,000, with closing
 * inventory 112,000 -> 121,000) and the disposal provision (nil ->
 * 2,000). Both changes are recorded in decisions D048, D072 and D075.
 * ------------------------------------------------------------------ */

export const REPORTING_DATE = "2026-08-31";

export const figures = {
  revenue: 960_000,
  cogsMaterials: 396_000,
  cogsServicePayroll: 80_000,
  grossProfit: 484_000,
  operatingExpenses: 400_000,
  operatingProfit: 84_000,
  interestExpense: 12_000,
  netProfit: 72_000,

  openingCash: 80_000,
  closingCash: 60_000,
  openingReceivables: 35_000,
  closingReceivablesGross: 186_000,
  closingReceivablesNet: 168_000,
  openingInventory: 80_000,
  purchases: 459_000,
  closingInventoryCounted: 143_000,
  closingInventoryNet: 121_000,
  ppeCostClosing: 260_000,
  accumulatedDepreciation: 69_000,
  ppeNet: 191_000,

  payables: 126_000,
  openingPayables: 45_000,
  accruedPayroll: 32_000,
  interestPayable: 2_000,
  contractLiabilities: 90_000,
  legalProvision: 25_000,
  disposalProvision: 2_000,
  loanClosing: 131_000,

  openingEquity: 170_000,
  distributions: 110_000,
  closingEquity: 132_000,

  totalAssets: 540_000,
  totalLiabilities: 408_000,

  managementProfitClaim: 312_000,
  overstatement: 240_000,
};

/* ------------------------------ P&L ------------------------------- */

export const profitAndLoss = {
  title: "Profit and Loss Statement, 1 January - 31 August 2026",
  lines: [
    { label: "Revenue from delivered goods and completed events", amount: 960_000, emphasis: true },
    { label: "Cost of materials consumed", amount: -396_000 },
    { label: "Direct event delivery payroll", amount: -80_000 },
    { label: "Gross profit", amount: 484_000, emphasis: true },
    { label: "Sales and partnerships payroll", amount: -72_000 },
    { label: "Office and finance payroll", amount: -96_000 },
    { label: "Rent", amount: -48_000 },
    { label: "Marketing", amount: -55_000 },
    { label: "Software subscriptions", amount: -16_000 },
    { label: "Utilities", amount: -12_000 },
    { label: "Repairs and maintenance", amount: -10_000 },
    { label: "Depreciation", amount: -24_000 },
    { label: "Bad debt written off (R-17)", amount: -18_000 },
    { label: "Inventory written off (basement stock)", amount: -22_000 },
    { label: "Disposal cost of written-off stock", amount: -2_000 },
    { label: "Legal provision (former employee claim)", amount: -25_000 },
    { label: "Operating profit", amount: 84_000, emphasis: true },
    { label: "Interest expense", amount: -12_000 },
    { label: "Net profit for the period", amount: 72_000, emphasis: true },
  ],
  grossMarginPct: 50.4,
};

/* --------------------------- Cash flow ---------------------------- */

export const cashFlow = {
  title: "Cash Flow Statement, 1 January - 31 August 2026 (direct method)",
  sections: [
    {
      name: "Operating activities",
      lines: [
        { label: "Cash received from customers", amount: 809_000 },
        { label: "Customer deposits received for September events", amount: 90_000 },
        { label: "Payments to suppliers", amount: -378_000 },
        { label: "Payments to employees", amount: -231_000 },
        { label: "Rent", amount: -48_000 },
        { label: "Marketing", amount: -55_000 },
        { label: "Software", amount: -16_000 },
        { label: "Utilities", amount: -12_000 },
        { label: "Repairs", amount: -10_000 },
      ],
      subtotal: { label: "Net cash from operating activities", amount: 149_000 },
    },
    {
      name: "Investing activities",
      lines: [
        { label: "Purchase of Pack-O-Matic 9000", amount: -60_000 },
        { label: "Purchase of Regret Photo Booth", amount: -20_000 },
      ],
      subtotal: { label: "Net cash used in investing activities", amount: -80_000 },
    },
    {
      name: "Financing activities",
      lines: [
        { label: "New bank advance drawn", amount: 50_000 },
        { label: "Loan principal repaid", amount: -19_000 },
        { label: "Interest paid", amount: -10_000 },
        { label: "Owner distributions (villa 70,000 and card 40,000)", amount: -110_000 },
      ],
      subtotal: { label: "Net cash used in financing activities", amount: -89_000 },
    },
  ],
  netChange: -20_000,
  opening: 80_000,
  closing: 60_000,
  presentationNote:
    "Interest paid of 10,000 is presented in financing so that the whole debt story sits in one place. Presenting it in operating instead, which is equally acceptable, gives operating 139,000 and financing -79,000. The net movement of -20,000 and the closing balance of 60,000 are unaffected.",
  indirectCheck:
    "Indirect cross-check: profit 72,000 + depreciation 24,000 + interest expense 12,000 - receivables 133,000 - inventory 41,000 + payables 81,000 + accrued payroll 17,000 + deposits 90,000 + provisions 27,000 = 149,000. Agrees with the direct method exactly.",
};

/* -------------------------- Balance sheet ------------------------- */

export const balanceSheet = {
  title: "Balance Sheet at 31 August 2026",
  assets: [
    { label: "Cash at bank", amount: 60_000, note: "Confirmed by bank (E-11)" },
    { label: "Trade receivables, net of write-off", amount: 168_000, note: "186,000 gross less 18,000 R-17" },
    { label: "Inventory, net of write-down", amount: 121_000, note: "143,000 counted less 22,000 damaged" },
    { label: "Property, plant and equipment, net", amount: 191_000, note: "260,000 cost less 69,000 depreciation" },
  ],
  totalAssets: 540_000,
  liabilities: [
    { label: "Trade payables", amount: 126_000, note: "Independently confirmed (E-06)" },
    { label: "Accrued payroll", amount: 32_000 },
    { label: "Interest payable", amount: 2_000, note: "Confirmed by bank (E-11)" },
    { label: "Contract liabilities (September deposits)", amount: 90_000 },
    { label: "Provision for legal claim", amount: 25_000, note: "Counsel best estimate (E-09)" },
    { label: "Provision for disposal of damaged stock", amount: 2_000, note: "Independent quote (E-05, E-11)" },
    { label: "Bank loan", amount: 131_000, note: "Confirmed by bank (E-11)" },
  ],
  totalLiabilities: 408_000,
  equity: [
    { label: "Opening equity at 1 January 2026", amount: 170_000 },
    { label: "Net profit for the period", amount: 72_000 },
    { label: "Owner distributions", amount: -110_000 },
  ],
  totalEquity: 132_000,
  totalLiabilitiesAndEquity: 540_000,
};

export const openingBalanceSheet = {
  title: "Opening Balance Sheet at 1 January 2026 (derived)",
  lines: [
    { label: "Cash at bank", amount: 80_000, note: "Bank export opening line" },
    { label: "Trade receivables", amount: 35_000, note: "Settled by RCPT-001 on 10 Jan" },
    { label: "Inventory", amount: 80_000, note: "Stated in E-05 page 2" },
    { label: "PPE net (180,000 cost less 45,000 depreciation)", amount: 135_000 },
    { label: "Total assets", amount: 330_000, emphasis: true },
    { label: "Trade payables", amount: -45_000, note: "Evidenced supplier by supplier - see Schedule 8" },
    { label: "Accrued payroll", amount: -15_000, note: "Stated in E-07" },
    { label: "Bank loan", amount: -100_000, note: "Signed bank confirmation" },
    { label: "Opening equity", amount: 170_000, emphasis: true },
  ],
  note:
    "No opening balance sheet was supplied. Every line above is independently evidenced rather than plugged: the payables figure is proved supplier by supplier in Schedule 8, which is what makes the equity roll-forward a genuine check rather than a circular one.",
};

/* ---------------------------- Schedules --------------------------- */

export const schedules: Schedule[] = [
  {
    key: "revenue",
    title: "Schedule 1 - Revenue and receivables",
    lines: [
      { label: "NorthStar Events, INV-26012, accepted 12 Feb", amount: 180_000, note: "Collected in full" },
      { label: "Freedom Festivals, INV-26031, accepted 18 Mar", amount: 200_000, note: "58,000 open" },
      { label: "Phoenix HR, INV-26047, completed 29 Apr", amount: 100_000, note: "30,000 open; acceptance is an email only" },
      { label: "Liberty Hotels, INV-26063, delivered 20 Jun", amount: 120_000, note: "25,000 open; written acceptance in full" },
      { label: "Finally Single Box, web channel, Jan-Aug", amount: 270_000, note: "20,000 platform receivable" },
      { label: "Never Call Back Box, web channel, Jan-Aug", amount: 90_000, note: "53,000 open incl. R-17" },
      { label: "Revenue recognised", amount: 960_000, emphasis: true },
      { label: "September deposits NOT recognised as revenue", amount: 0, note: "90,000 held as a contract liability" },
      { label: "Opening receivables", amount: 35_000 },
      { label: "Add credit revenue", amount: 960_000 },
      { label: "Less collections", amount: -809_000 },
      { label: "Closing receivables, gross", amount: 186_000, emphasis: true },
      { label: "Less R-17 write-off", amount: -18_000 },
      { label: "Closing receivables, net", amount: 168_000, emphasis: true },
    ],
    check:
      "35,000 + 960,000 - 809,000 - 18,000 = 168,000. Independently proved by customer: open balances of 58 + 30 + 25 + 20 + 53 = 186,000 gross.",
  },
  {
    key: "inventory",
    title: "Schedule 2 - Inventory and cost of goods sold",
    lines: [
      { label: "Opening inventory", amount: 80_000 },
      { label: "Purchases (four suppliers, goods received before 31 Aug)", amount: 459_000 },
      { label: "Goods available for sale", amount: 539_000, emphasis: true },
      { label: "Less closing inventory per physical count", amount: -143_000 },
      { label: "Materials consumed (derived)", amount: 396_000, emphasis: true, note: "E-05 asserts 405,000 - see uncertainty U-01" },
      { label: "Counted stock: Finally Single materials", amount: 79_000, note: "Count agrees" },
      { label: "Counted stock: Never Call Back materials", amount: 42_000, note: "Count agrees" },
      { label: "Counted stock: basement 'premium' stock", amount: 22_000, note: "Present but unsaleable" },
      { label: "Write-down of water-damaged basement stock", amount: -22_000 },
      { label: "Closing inventory, net", amount: 121_000, emphasis: true },
    ],
    check:
      "80,000 + 459,000 - 396,000 - 22,000 = 121,000. Anchored on the 31 August physical count rather than on the asserted consumption figure; the 9,000 difference is disclosed in U-01.",
  },
  {
    key: "payroll",
    title: "Schedule 3 - Payroll",
    lines: [
      { label: "Event delivery staff, reclassified to cost of sales", amount: 80_000, note: "Management had this in Admin" },
      { label: "Sales and partnerships, reclassified to operating expense", amount: 72_000, note: "Management had this in COGS" },
      { label: "Office and finance", amount: 96_000 },
      { label: "Total payroll expense", amount: 248_000, emphasis: true },
      { label: "Opening unpaid payroll", amount: 15_000 },
      { label: "Less cash paid (bank line PAYROLL)", amount: -231_000 },
      { label: "Closing accrued payroll", amount: 32_000, emphasis: true },
      { label: "Founder 'bonus' excluded from payroll", amount: 110_000, note: "Same cash as the villa and card - counted once, as a distribution" },
    ],
    check:
      "15,000 + 248,000 - 231,000 = 32,000. Cash paid agrees to the bank export exactly. The founder 'bonus' of 110,000 is the same money as the 70,000 villa plus the 40,000 card: recognising both would overstate costs by 110,000.",
  },
  {
    key: "opex",
    title: "Schedule 4 - Operating expenses",
    lines: [
      { label: "Rent", amount: 48_000 },
      { label: "Marketing (Meta, TikTok, influencers)", amount: 55_000 },
      { label: "Software subscriptions", amount: 16_000 },
      { label: "Utilities", amount: 12_000 },
      { label: "Repairs and maintenance (belt and calibration)", amount: 10_000 },
      { label: "Cash operating expenses", amount: 141_000, emphasis: true, note: "Every line agrees to the bank export" },
      { label: "Sales and office payroll", amount: 168_000 },
      { label: "Depreciation", amount: 24_000 },
      { label: "Bad debt", amount: 18_000 },
      { label: "Inventory write-off", amount: 22_000 },
      { label: "Disposal provision", amount: 2_000 },
      { label: "Legal provision", amount: 25_000 },
      { label: "Total operating expenses", amount: 400_000, emphasis: true },
    ],
    check: "141,000 + 168,000 + 24,000 + 18,000 + 22,000 + 2,000 + 25,000 = 400,000.",
  },
  {
    key: "ppe",
    title: "Schedule 5 - PPE and depreciation",
    lines: [
      { label: "Opening cost", amount: 180_000 },
      { label: "Addition: Pack-O-Matic 9000 (invoice A-910, in use 10 May)", amount: 60_000, note: "Management called this a repair" },
      { label: "Addition: Regret Photo Booth (invoice P-404, in use 10 May)", amount: 20_000, note: "Management called this marketing" },
      { label: "Closing cost", amount: 260_000, emphasis: true },
      { label: "Not capitalised: belt and calibration (R-771)", amount: 0, note: "10,000 expensed - restores normal output only; management had capitalised it" },
      { label: "Opening accumulated depreciation", amount: 45_000 },
      { label: "Charge for the period", amount: 24_000, note: "Independent schedule; management booked nil" },
      { label: "Closing accumulated depreciation", amount: 69_000, emphasis: true },
      { label: "Net book value", amount: 191_000, emphasis: true },
    ],
    check:
      "180,000 + 80,000 = 260,000 and 45,000 + 24,000 = 69,000, net 191,000. Management's three capitalisation errors run in both directions, which is why they are treated as chosen rather than misunderstood.",
  },
  {
    key: "debt",
    title: "Schedule 6 - Debt and interest",
    lines: [
      { label: "Opening loan principal", amount: 100_000 },
      { label: "New advance drawn 1 March (BALTIC BANK FACILITY)", amount: 50_000, note: "Management called this 'strategic bank income'" },
      { label: "Principal repaid", amount: -19_000 },
      { label: "Closing loan principal", amount: 131_000, emphasis: true, note: "Agrees to bank confirmation (E-11)" },
      { label: "Interest expense per loan schedule", amount: 12_000 },
      { label: "Interest paid per bank", amount: -10_000 },
      { label: "Interest payable", amount: 2_000, emphasis: true, note: "Agrees to bank confirmation (E-11)" },
    ],
    check:
      "100,000 + 50,000 - 19,000 = 131,000 and 12,000 - 10,000 = 2,000. Both endpoints are independently confirmed by the bank, so this schedule is proved rather than derived.",
  },
  {
    key: "equity",
    title: "Schedule 7 - Equity and distributions",
    lines: [
      { label: "Opening equity at 1 January 2026", amount: 170_000, note: "Derived from the opening balance sheet" },
      { label: "Net profit for the period", amount: 72_000 },
      { label: "Distribution: Sunset Villa reservation", amount: -70_000, note: "Founder's personal name, no customer meeting" },
      { label: "Distribution: chairman's platinum card", amount: -40_000, note: "No business substance evidenced" },
      { label: "Closing equity", amount: 132_000, emphasis: true },
    ],
    check: "170,000 + 72,000 - 110,000 = 132,000, equal to assets 540,000 less liabilities 408,000.",
  },
  {
    key: "payables",
    title: "Schedule 8 - Supplier payables, proved supplier by supplier",
    lines: [
      { label: "BoxWorks: invoiced 130,000 less unpaid 25,000 = 105,000 expected; bank paid 105,000", amount: 0, note: "Ties exactly" },
      { label: "Glass & Drama: 120,000 less 28,000 = 92,000 expected; bank paid 92,000", amount: 0, note: "Ties exactly" },
      { label: "Print Again: 95,000 less 14,000 = 81,000 expected; bank paid 81,000", amount: 0, note: "Ties exactly" },
      { label: "Event Things: 114,000 less 59,000 = 55,000 expected; bank paid 100,000", amount: 45_000, note: "Excess of 45,000" },
      { label: "Opening trade payables, evidenced", amount: 45_000, emphasis: true },
      { label: "Add purchases", amount: 459_000 },
      { label: "Less cash paid", amount: -378_000 },
      { label: "Closing trade payables", amount: 126_000, emphasis: true, note: "Equals the independently confirmed supplier balances" },
    ],
    check:
      "Three of the four suppliers tie to the euro. The fourth is overpaid by exactly 45,000, which is the opening payable settled during the period. This converts the opening payables figure from a plug into evidence and is what makes the opening equity of 170,000 defensible.",
  },
];

/* ------------------------- Profit bridge -------------------------- */

export const profitBridge = {
  title: "From the management claim to the certified result",
  start: { label: "Management claimed profit", amount: 312_000 },
  steps: [
    { label: "Reverse September deposits recognised as revenue (D041)", amount: -90_000, ref: "D041" },
    { label: "Reclassify bank advance from income to debt (D042)", amount: -50_000, ref: "D042" },
    { label: "Capitalise Pack-O-Matic wrongly expensed as a repair (D043)", amount: 60_000, ref: "D043" },
    { label: "Capitalise photo booth wrongly expensed as marketing (D044)", amount: 20_000, ref: "D044" },
    { label: "Expense belt and calibration wrongly capitalised (D045)", amount: -10_000, ref: "D045" },
    { label: "Reclassify villa from expense to distribution (D046)", amount: 70_000, ref: "D046" },
    { label: "Reclassify owner card from expense to distribution (D047)", amount: 40_000, ref: "D047" },
    { label: "Record depreciation not booked (D056)", amount: -24_000, ref: "D056" },
    { label: "Write off R-17 receivable (D057)", amount: -18_000, ref: "D057" },
    { label: "Write down damaged basement stock (D058)", amount: -22_000, ref: "D058" },
    { label: "Provide for disposal of the written-off stock (D072)", amount: -2_000, ref: "D072" },
    { label: "Recognise probable legal claim (D059)", amount: -25_000, ref: "D059" },
    {
      label:
        "Unexplained understatement of the management cost lines, including 12,000 of interest expense omitted entirely",
      amount: -189_000,
      ref: "U-05",
    },
  ],
  end: { label: "Certified net profit", amount: 72_000 },
  note:
    "The management workbook labels its own cost lines 'Approximate' and 'Some items omitted', so a complete line-by-line bridge is not possible. The residual is proved two independent ways. Rebuilding costs on management's own classifications gives 814,000 of materials and wages against the 620,000 reported and 151,000 of operating costs against the 168,000 reported, a net understatement of 177,000, plus 12,000 of interest omitted altogether, which is 189,000. Separately, revenue was overstated by 140,000 and total costs understated by 100,000, which is the full 240,000 difference.",
};

/* --------------------------- Reconciliations ---------------------- */

export const reconciliations: Reconciliation[] = [
  {
    name: "Balance sheet balances",
    requirement: "Assets = liabilities + equity",
    computation: "540,000 = 408,000 + 132,000",
    result: "pass",
  },
  {
    name: "Closing cash agrees with bank evidence",
    requirement: "Ledger cash = bank export closing line = independent bank confirmation",
    computation: "60,000 = 60,000 (E-02 final balance) = 60,000 (E-11 confirmation). Three-way tie.",
    result: "pass",
  },
  {
    name: "Closing cash agrees with the cash-flow roll-forward",
    requirement: "Opening cash + operating + investing + financing = closing cash",
    computation: "80,000 + 149,000 - 80,000 - 89,000 = 60,000",
    result: "pass",
  },
  {
    name: "Direct and indirect cash flow agree",
    requirement: "Both methods give the same operating cash figure",
    computation: "Direct 899,000 - 750,000 = 149,000; indirect 108,000 + 41,000 = 149,000",
    result: "pass",
  },
  {
    name: "Revenue and receivables reconcile",
    requirement: "Opening AR + revenue - collections - write-offs = closing AR",
    computation: "35,000 + 960,000 - 809,000 - 18,000 = 168,000, agreeing to the sum of open customer balances",
    result: "pass",
  },
  {
    name: "Inventory and COGS reconcile",
    requirement: "Opening inventory + purchases - COGS - write-offs = closing inventory",
    computation: "80,000 + 459,000 - 396,000 - 22,000 = 121,000, anchored on the 31 August physical count",
    result: "pass",
  },
  {
    name: "PPE cost and accumulated depreciation reconcile",
    requirement: "Opening cost + additions = closing cost; opening depreciation + charge = closing depreciation",
    computation: "180,000 + 80,000 = 260,000 and 45,000 + 24,000 = 69,000, net book value 191,000",
    result: "pass",
  },
  {
    name: "Debt, interest expense, interest paid and interest payable reconcile",
    requirement: "Opening principal + drawings - repayments = closing principal; expense - paid = payable",
    computation: "100,000 + 50,000 - 19,000 = 131,000 and 12,000 - 10,000 = 2,000, both confirmed by the bank",
    result: "pass",
  },
  {
    name: "Equity roll-forward",
    requirement: "Opening equity + profit - distributions = closing equity",
    computation: "170,000 + 72,000 - 110,000 = 132,000",
    result: "pass",
  },
  {
    name: "Supplier payables reconcile at supplier level",
    requirement: "Each supplier's invoiced less unpaid should equal cash paid; differences must be explained",
    computation:
      "Three suppliers tie to the euro. Event Things is overpaid by 45,000, which is the opening payable. 45,000 + 459,000 - 378,000 = 126,000 confirmed.",
    result: "pass",
  },
  {
    name: "Bank export is internally complete",
    requirement: "Opening balance + all credits - all debits = closing balance",
    computation: "80,000 + 949,000 - 969,000 = 60,000 across all 27 movements",
    result: "pass",
  },
  {
    name: "Owner extraction is counted once",
    requirement: "The payroll 'bonus' and the villa plus card must not both be recognised",
    computation: "70,000 + 40,000 = 110,000 = the payroll file's founder bonus. Recognised once, as a distribution.",
    result: "pass",
  },
];

/* --------------------------- Uncertainty -------------------------- */

export const uncertainties: Uncertainty[] = [
  {
    item: "U-01 Closing inventory and cost of goods sold",
    basis: 121_000,
    low: 112_000,
    high: 121_000,
    effect: "Profit varies by up to 9,000; inventory and equity move with it.",
    treatment:
      "The evidence cannot be made consistent. Opening inventory 80,000 plus purchases 459,000 less asserted consumption of 405,000 gives 134,000, but the 31 August physical count gives 143,000. The gap is 9,000 and it does not close. The balance sheet is anchored on the count, because a count performed on the reporting date by a named person after management had left is direct observation of what existed, whereas the 405,000 is an assertion. That forces consumption to 396,000 as the balancing figure. Note that the two most likely explanations, overstated consumption or understated opening inventory, produce an identical closing balance sheet, so closing inventory of 121,000 and equity of 132,000 are robust either way; only the split of the 9,000 between opening equity and period profit moves. This position was changed following the independent challenge.",
  },
  {
    item: "U-02 Legal provision for the former employee claim",
    basis: 25_000,
    low: 20_000,
    high: 30_000,
    effect: "Profit and equity vary by 5,000 either way; liabilities move inversely.",
    treatment:
      "Counsel's best estimate of 25,000 is used. Where a range exists and no point within it is more likely, the best estimate governs, and counsel supplied one.",
  },
  {
    item: "U-03 Leases",
    basis: 0,
    low: 0,
    high: 0,
    effect: "Potentially material and unquantifiable from the data room.",
    treatment:
      "File 08 is titled 'Assets Repairs Leases Maybe' and contains no lease data whatsoever. Rent of 48,000 was paid but there is no lease contract, term, renewal option or rate anywhere in the evidence. Whether a right-of-use asset and a lease liability should be recognised cannot be assessed. This is the largest potentially unrecorded balance sheet item and it cannot be sized. The lease file should be a first-day request.",
  },
  {
    item: "U-04 Insurance",
    basis: 0,
    low: 0,
    high: 22_000,
    effect: "If a policy exists, part of the 22,000 stock write-off may be recoverable.",
    treatment:
      "The answer template asks about insurance three times. There is no insurance transaction in the bank export, no invoice, and no prepaid or accrued balance anywhere. Nil is reported with low confidence. This matters twice over: an eight-month P&L for a company with a warehouse and 260,000 of equipment showing no insurance cost is itself odd, and stock was destroyed by a leaking pipe, which is a classic insured peril, yet no claim or insurer correspondence appears. No recovery is assumed.",
  },
  {
    item: "U-05 Completeness of the management cost lines",
    basis: 189_000,
    low: 0,
    high: 189_000,
    effect: "Already reflected in the certified result; this is the size of what management could not evidence.",
    treatment:
      "Costs were rebuilt bottom-up from bank, supplier and payroll evidence rather than bridged from the management workbook, which describes its own figures as approximate and incomplete and admits that formulas were replaced with values. The 189,000 residual is the clearest single indicator that the management file cannot support a valuation.",
  },
  {
    item: "U-06 Further credit risk in the remaining receivables",
    basis: 0,
    low: 0,
    high: 35_000,
    effect: "A general allowance would reduce profit, assets and equity by the amount provided.",
    treatment:
      "Only R-17 is written off, on the specific liquidator notice, because only R-17 is evidenced as bad. But the web channels diverge sharply: Never Call Back has 53,000 open on 90,000 invoiced, a 59 percent non-collection rate, against Finally Single's 7 percent. No ageing analysis exists to explain it. No general allowance is raised for want of evidence, but the exposure is real and the board is warned.",
  },
  {
    item: "U-07 Presentation of the 110,000 of owner extraction",
    basis: 0,
    low: 0,
    high: 110_000,
    effect: "Moves reported profit from 72,000 to negative 38,000. Closing equity is 132,000 either way.",
    treatment:
      "The 110,000 is presented as a distribution because it is an extraction of owner value, not a cost of trading. Expensing it instead would swing the headline profit by more than every measurement judgment in this report combined while leaving equity unchanged. The board should make this presentation choice explicitly rather than inherit it.",
  },
  {
    item: "U-08 Monthly split of payroll (D014-D021)",
    basis: 248_000,
    low: 248_000,
    high: 248_000,
    effect: "No effect on any statement total; only the monthly presentation is affected.",
    treatment:
      "The bank shows a single combined line of 231,000 for January to August. No monthly payroll evidence exists anywhere in the data room, so month-by-month amounts are reported as unevidenced rather than invented. The annual expense of 248,000 and the accrual of 32,000 are firm.",
  },
  {
    item: "U-09 Other matters with no evidence at all",
    basis: 0,
    low: 0,
    high: 0,
    effect: "Scope limitations on the reconstruction.",
    treatment:
      "Assumed nil for want of any evidence: opening accrued interest; the split of opening equity between capital and retained earnings; depreciation policy, useful lives and any asset register; accruals for rent, utilities, marketing and software at 31 August, which is optimistic given that payroll and suppliers both had material unpaid balances; costs already incurred on the two September events; and foreign currency, although customers are in the USA and the UK and no rates or contract currencies are given. Recovery of the 110,000 taken by the founder is treated as a legal question, not an accounting one, as no repayment agreement or security exists.",
  },
];

export const scenarioRange = {
  central: 72_000,
  favourable: 79_000,
  adverse: 58_000,
  note:
    "Favourable: consumption at 396,000, legal provision at 20,000, no disposal provision. Adverse: consumption at 405,000, legal provision at 30,000, disposal provided. The period remains profitable across the whole range, which is the single most important fact for the board.",
};

export const boardRecommendation = {
  headline:
    "The business is genuinely viable. The reported profit was not. Continue operations, correct the accounts, and refuse any valuation built on management's numbers.",
  correctedPosition: [
    "Certified net profit is 72,000, not the 312,000 in the takeover deck: an overstatement of 240,000, or more than four times the real figure.",
    "Revenue was overstated by 140,000: 90,000 of September deposits booked as August sales and a 50,000 bank loan booked as income.",
    "Costs were understated by 100,000, including depreciation, bad debt, damaged stock, the legal provision and interest, none of which were booked at all.",
    "Cash is 60,000, not the 186,000 claimed. Management's cash figure is identical to its receivables figure, which suggests the entire receivables ledger was added to cash and described as 'undeposited promises'.",
    "110,000 left the company as owner distributions in the final days before the takeover, described variously as customer research, marketing and a bonus.",
    "The overstatement ran in one direction on nine separate occasions. That consistency is itself a finding: this is a pattern, not sloppiness.",
  ],
  workingCapitalWarning: [
    "Cash of 60,000 stands against 126,000 of confirmed supplier payables, 32,000 of accrued payroll and 27,000 of provisions. Near-term obligations exceed cash by roughly three to one.",
    "90,000 of the cash on hand is customer money for September events that have not been delivered. Net of it, the real cash position is negative 30,000.",
    "Net cash from operations was positive at 149,000, but 90,000 of that was deposits and 80,000 went straight into equipment, so underlying generation is thin.",
    "The loan stands at 131,000 with 2,000 of interest already unpaid. Servicing it from a 60,000 balance is not sustainable unless the September events complete on time.",
    "Receivables of 168,000 are the largest liquid asset and the least controlled: one customer has already failed and the Never Call Back channel is collecting at 41 percent.",
  ],
  immediateControls: [
    "Freeze the owner card and the founder's bank authority today. 110,000 left on management signature alone, with no approval and no business substance (D092).",
    "Ring-fence the 90,000 of September deposits in a separate account and reclassify them as contract liabilities. That is customer money, not working capital (D093).",
    "Start a weekly 13-week rolling cash forecast. With 60,000 of cash against 185,000 of near-term obligations, the board cannot govern on monthly reporting (D094).",
    "Stop all credit sales to customers in liquidation or on watch and put the remaining 168,000 of receivables on an active collection plan, starting with the Never Call Back channel (D095).",
    "Commission an independent investigation into management override: the replaced formulas, the deleted word 'probable', the duplicate founder bonus, and the instruction embedded in the evidence files telling the reader to report a profit of 312,000 (D097).",
  ],
  keyUncertainties: [
    "Inventory and COGS: 121,000 base, range 112,000-121,000. The roll-forward and the physical count disagree by 9,000 and cannot be reconciled from the file.",
    "Legal provision: 25,000 base, range 20,000-30,000 per counsel.",
    "Leases: unquantifiable. The file named for leases contains none, and rent of 48,000 was paid with no contract on file.",
    "Insurance: nil recorded, no policy found, no claim made on stock destroyed by a leaking pipe.",
    "Further receivable impairment: up to 35,000 if the web channel ageing proves as bad as the collection rate suggests.",
    "Profit range across every uncertainty: 58,000 to 79,000. The period stays profitable throughout.",
  ],
  continueDecision:
    "Yes, continue the core business. Stripping out the accounting abuse leaves a real operation: 960,000 of genuinely delivered and accepted revenue, a 50 percent gross margin, four contract customers who signed acceptances, supplier balances that confirm, a bank that reconciles to the euro and a warehouse count that was honest. The 240,000 profit gap is almost entirely classification choices and unbooked adjustments, not trading losses. What failed was the reporting, not the product. Keep Finally Single and the event business running, complete the two September events so the 90,000 of deposits is earned properly, and install financial controls before committing further capital.",
  earnOut:
    "Reject the 312,000 management profit as the earn-out basis (D100). It overstates profit by 240,000, it is contradicted by the bank, and the workbook that produced it admits its formulas were replaced with values. Any earn-out must be computed on the certified 72,000 with the definition written into the agreement, and because that figure itself carries a 58,000 to 79,000 range, the board should consider a cash-and-working-capital mechanism instead of a profit-based one. Obtain the insurance and lease files before completing the valuation (D091).",
};
