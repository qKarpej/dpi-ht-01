import type { Decision } from "./types";

/**
 * statementEffect convention
 * -------------------------
 * The effect of the certified treatment measured against the treatment the
 * former management actually booked, in EUR. A positive profit figure means
 * the correction increases profit relative to management. Where management's
 * booking cannot be identified because its cost lines are undifferentiated,
 * the effect is measured against the specific alternative that was rejected,
 * and this is stated in studentReasoning.
 *
 * Where two decisions describe the same underlying adjustment - for example
 * the classification decision and the estimation decision for the same
 * write-off - the effect is carried once by a primary decision and the other
 * carries an aggregationNote. The profit bridge counts only primaries, so no
 * euro is counted twice.
 */

export const decisions: Decision[] = [
  /* ============ D001-D040 evidence matching, operational ============ */
  {
    id: "D001",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of NorthStar receipt.",
    answer:
      "Bank line RCPT-NS, 12 February 2026, credit 180,000, narrative 'N STAR EVENTS'. It matches signed invoice INV-26012 for 180,000 of Finally Single Boxes, accepted 12 February. The CRM spells the customer three ways (North Star, N STAR, NorthStar Events) but the amount and date tie exactly, so this is one customer and one transaction, not three. Treated as full collection of a delivered sale: revenue 180,000 recognised on 12 February, closing receivable nil.",
    evidence: ["E-02 bank line RCPT-NS", "E-04 INV-26012", "E-03 CRM C-001"],
    confidence: "high",
  },
  {
    id: "D002",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Freedom receipt 1.",
    answer:
      "Bank line RCPT-FF, 18 March 2026, credit 142,000, narrative 'FREEDOM FEST 1/2'. Signed invoice INV-26031 is for 200,000 of Never Call Back Boxes, accepted 18 March. This is a part payment: revenue 200,000 is recognised in full on delivery and 58,000 remains as a receivable. The bank narrative '1/2' confirms a further instalment was expected and never arrived.",
    evidence: ["E-02 bank line RCPT-FF", "E-04 INV-26031", "E-03 CRM C-002"],
    confidence: "high",
  },
  {
    id: "D003",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Phoenix receipt.",
    answer:
      "Bank line RCPT-PHX, 29 April 2026, credit 70,000, narrative 'PHOENIX PEOPLE TEAM'. Invoice INV-26047 is for 100,000, a Divorce Victory Party completed 29 April. Revenue 100,000 recognised, receivable 30,000. Two weaknesses are noted: final acceptance is a customer email rather than a signed acceptance, and the customer is 'Phoenix People' in the CRM but 'Phoenix HR' in the contracts file. Performance is nonetheless evidenced by the completion date and the part payment, and the customer has not disputed.",
    evidence: ["E-02 bank line RCPT-PHX", "E-04 INV-26047", "E-03 CRM C-003"],
    confidence: "medium",
  },
  {
    id: "D004",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Liberty receipt.",
    answer:
      "Bank line RCPT-LIB, 20 June 2026, credit 95,000. Invoice INV-26063 is for a 120,000 mixed order delivered 20 June. Revenue 120,000 recognised, receivable 25,000. Acceptance is explicit and in writing: the customer wrote that the boxes arrived, the glitter was excessive, which was exactly the point, and the order was accepted in full. A complaint about glitter is not a rejection.",
    evidence: ["E-02 bank line RCPT-LIB", "E-04 INV-26063", "E-03 CRM C-004"],
    confidence: "high",
  },
  {
    id: "D005",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Opening receivable receipt.",
    answer:
      "Bank line RCPT-001, 10 January 2026, credit 35,000, narrative 'Old customer AR settlement'. This is the collection of a receivable that existed at 1 January and is not revenue of the current period. It is the only evidence of the opening receivables balance and establishes opening trade receivables of 35,000, which is used in the opening balance sheet.",
    evidence: ["E-02 bank line RCPT-001"],
    confidence: "medium",
  },
  {
    id: "D006",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Finally Single web receipts.",
    answer:
      "Bank line PLAT-FSB, 1 August 2026, credit 250,000, narrative 'STRIPE SETTLEMENT FINALLY SINGLE'. The CRM shows WEB-FSB invoiced 270,000 across January to August with 250,000 cash matched and a 20,000 platform receivable. Revenue 270,000 is recognised across the period as boxes were despatched, not on 1 August. A single settlement date for eight months of trading is a platform payout, not an August sale, and must not be used to date the revenue.",
    evidence: ["E-02 bank line PLAT-FSB", "E-03 CRM WEB-FSB"],
    confidence: "medium",
  },
  {
    id: "D007",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Never Call Back web receipts.",
    answer:
      "Bank line PLAT-NCB, 15 August 2026, credit 37,000. The CRM shows WEB-NCB invoiced 90,000 with 53,000 gross open, cross-referenced to R-17. Revenue 90,000 recognised across the period; gross receivable 53,000, of which 18,000 is written off as R-17, leaving 35,000 net. The collection rate of 41 percent against Finally Single's 93 percent is a control red flag with no supporting ageing data in the file.",
    evidence: ["E-02 bank line PLAT-NCB", "E-03 CRM WEB-NCB", "E-04 Return R-17"],
    confidence: "medium",
  },
  {
    id: "D008",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of New Beginnings deposit.",
    answer:
      "Bank line DEP-NB, 28 August 2026, credit 60,000, narrative 'NEW BEGINNINGS SEPT'. The contract file states delivery 15 September 2026 with no goods or service delivered by 31 August. Cash increases and a contract liability of 60,000 is recognised. It is not revenue. The bank narrative itself says SEPT.",
    evidence: ["E-02 bank line DEP-NB", "E-04 NB-SEP", "E-03 CRM FUT-01"],
    confidence: "high",
  },
  {
    id: "D009",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Fresh Freedom deposit.",
    answer:
      "Bank line DEP-FF2, 29 August 2026, credit 30,000, narrative 'FRESH FREEDOM SEPT'. Delivery date 24 September 2026, nothing delivered by 31 August. Contract liability of 30,000 recognised, not revenue.",
    evidence: ["E-02 bank line DEP-FF2", "E-04 FF-SEP", "E-03 CRM FUT-02"],
    confidence: "high",
  },
  {
    id: "D010",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Box supplier payment.",
    answer:
      "Bank line SUP-BOX, 31 August 2026, debit 105,000. BoxWorks invoiced 130,000 with 25,000 unpaid, so the expected payment against current-period invoices is exactly 105,000. It ties to the euro. The payment reduces trade payables; the cost driver is the 130,000 of goods received before 31 August, which enters the inventory roll-forward.",
    evidence: ["E-02 bank line SUP-BOX", "E-06 BoxWorks batch"],
    confidence: "high",
  },
  {
    id: "D011",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Glass supplier payment.",
    answer:
      "Bank line SUP-GLS, debit 92,000. Glass & Drama Ltd. invoiced 120,000 with 28,000 unpaid, giving an expected payment of 92,000. Ties exactly. Reduces trade payables; 120,000 of goods received enters purchases.",
    evidence: ["E-02 bank line SUP-GLS", "E-06 Glass & Drama Ltd."],
    confidence: "high",
  },
  {
    id: "D012",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Print supplier payment.",
    answer:
      "Bank line SUP-PRT, debit 81,000. Print Again SIA invoiced 95,000 with 14,000 unpaid, giving an expected payment of 81,000. Ties exactly. Reduces trade payables; 95,000 of goods received enters purchases.",
    evidence: ["E-02 bank line SUP-PRT", "E-06 Print Again SIA"],
    confidence: "high",
  },
  {
    id: "D013",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Event supplier payment.",
    answer:
      "Bank line SUP-EVT, debit 100,000, but Event Things Europe invoiced 114,000 with 59,000 unpaid, so only 55,000 was due on current-period invoices. The excess of 45,000 is the settlement of an opening trade payable. This is the single most useful reconciling item in the file: the other three suppliers tie to the euro, so the 45,000 is not noise, and it independently evidences the opening payables balance of 45,000 used in the opening balance sheet. The alternative reading, a 45,000 supplier prepayment, is rejected because it would leave the confirmed closing payable of 126,000 unreconciled.",
    evidence: ["E-02 bank line SUP-EVT", "E-06 Event Things Europe", "E-06 TOTAL 459,000 with 126,000 unpaid"],
    confidence: "medium",
  },
  {
    id: "D014",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of January payroll.",
    answer:
      "No January-specific payroll evidence exists. The bank contains a single line, PAYROLL dated 31 August, for 231,000 described as 'Payroll Jan-Aug combined'. No monthly breakdown appears anywhere in the data room. A January amount is therefore reported as unevidenced rather than invented; on a straight-line basis the period expense of 248,000 implies roughly 31,000 per month, but that is an arithmetic assumption, not evidence. The period total of 248,000 and the closing accrual of 32,000 are firm.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals"],
    confidence: "low",
  },
  {
    id: "D015",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of February payroll.",
    answer:
      "No February-specific payroll evidence exists. Covered by the single combined bank line of 231,000 for January to August. Reported as unevidenced at monthly level; the period expense of 248,000 is firm and is allocated to the period in which employees worked, not to the August payment date.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals"],
    confidence: "low",
  },
  {
    id: "D016",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of March payroll.",
    answer:
      "No March-specific payroll evidence exists. Covered by the single combined bank line of 231,000. Reported as unevidenced at monthly level; the period expense of 248,000 is firm.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals"],
    confidence: "low",
  },
  {
    id: "D017",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of April payroll.",
    answer:
      "No April-specific payroll evidence exists. Covered by the single combined bank line of 231,000. Reported as unevidenced at monthly level; the period expense of 248,000 is firm.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals"],
    confidence: "low",
  },
  {
    id: "D018",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of May payroll.",
    answer:
      "No May-specific payroll evidence exists. Covered by the single combined bank line of 231,000. Reported as unevidenced at monthly level; the period expense of 248,000 is firm.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals"],
    confidence: "low",
  },
  {
    id: "D019",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of June payroll.",
    answer:
      "No June-specific payroll evidence exists. Covered by the single combined bank line of 231,000. Reported as unevidenced at monthly level; the period expense of 248,000 is firm.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals"],
    confidence: "low",
  },
  {
    id: "D020",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of July payroll.",
    answer:
      "No July-specific payroll evidence exists. Covered by the single combined bank line of 231,000. Reported as unevidenced at monthly level; the period expense of 248,000 is firm.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals"],
    confidence: "low",
  },
  {
    id: "D021",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of August payroll.",
    answer:
      "The single bank line PAYROLL of 231,000 is dated 31 August but covers January to August, so it is not an August cost. August's own payroll is not separately evidenced. What is firm is that 231,000 of cash left the bank and that 248,000 of expense belongs to the period, leaving 32,000 accrued at the reporting date once the 15,000 opening accrual is taken in.",
    evidence: ["E-02 bank line PAYROLL", "E-07 Payroll totals and opening accrual"],
    confidence: "medium",
  },
  {
    id: "D022",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Rent payments.",
    answer:
      "Bank line RENT, debit 48,000, described as 'Rent Jan-Aug'. Charged in full to operating expenses for the period, equivalent to 6,000 per month. No lease agreement, term or rate appears anywhere in the data room, so no prepayment, accrual, right-of-use asset or lease liability can be assessed. The file named for leases contains no lease data at all.",
    evidence: ["E-02 bank line RENT", "E-08 file scope"],
    confidence: "medium",
  },
  {
    id: "D023",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Meta and influencer payments.",
    answer:
      "Bank line MKT, debit 55,000, 'Meta, TikTok and influencers'. Ordinary marketing expense of the period. The founder's instruction to move the 70,000 villa into this category is rejected: the villa is a distribution and marketing remains at 55,000.",
    evidence: ["E-02 bank line MKT", "E-10 page 2 villa instruction"],
    confidence: "high",
  },
  {
    id: "D024",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Software payments.",
    answer:
      "Bank line SOFT, debit 16,000, software subscriptions. Operating expense of the period. Subscriptions confer no long-term resource the company controls, so no capitalisation arises. No evidence of any prepaid element at 31 August.",
    evidence: ["E-02 bank line SOFT"],
    confidence: "high",
  },
  {
    id: "D025",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Utilities payments.",
    answer:
      "Bank line UTIL, debit 12,000. Operating expense of the period. No evidence of an unbilled or accrued balance at 31 August, which is noted as optimistic given that payroll and suppliers both carried material unpaid balances.",
    evidence: ["E-02 bank line UTIL"],
    confidence: "medium",
  },
  {
    id: "D026",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Repair transfer.",
    answer:
      "Bank line REPAIR, debit 10,000, 'Emergency machine work', matching third-party invoice R-771 dated 3 July for a replacement belt, cleaning and calibration. The invoice states the work restored normal output and did not increase capacity or extend useful life, which is the definition of repairs and maintenance. Expensed in full. Management had capitalised it, which is wrong in the opposite direction to its treatment of the two genuine assets.",
    evidence: ["E-02 bank line REPAIR", "E-06 invoice R-771", "E-08 management class 'PPE'"],
    confidence: "high",
  },
  {
    id: "D027",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Packaging machine payment.",
    answer:
      "Bank line CAPEX-PACK, debit 60,000, 'PACK-O-MATIC 9000', matching equipment invoice A-910 for a packaging machine installed and available for use on 10 May. Capitalised as PPE and depreciated. Management classified it as a repair, which the third-party invoice contradicts directly.",
    evidence: ["E-02 bank line CAPEX-PACK", "E-06 invoice A-910", "E-08 management class 'Repair'"],
    confidence: "high",
  },
  {
    id: "D028",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Photo booth payment.",
    answer:
      "Bank line CAPEX-PHOTO, debit 20,000, matching equipment invoice P-404 for the Regret Photo Booth, available for use 10 May. It is a physical asset used to deliver events, not advertising spend. Capitalised as PPE. Management classified it as a marketing expense.",
    evidence: ["E-02 bank line CAPEX-PHOTO", "E-06 invoice P-404", "E-08 management class 'Marketing expense'"],
    confidence: "high",
  },
  {
    id: "D029",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Loan receipt.",
    answer:
      "Bank line LOAN-ADV, 1 March 2026, credit 50,000, narrative 'BALTIC BANK FACILITY'. The signed agreement calls it a loan and requires repayment. Recorded as a financing inflow and an increase in debt, not income. The management workbook's 'Strategic bank income' line and the founder's instruction to call it 'other income' because it 'sounds optimistic' are both rejected. Corroboration: principal of 19,000 was repaid against it and it forms part of the 131,000 confirmed by the bank.",
    evidence: ["E-02 bank line LOAN-ADV", "E-09 signed bank confirmation and agreement", "E-01 'Strategic bank income'", "E-10 page 1"],
    confidence: "high",
  },
  {
    id: "D030",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Loan repayments.",
    answer:
      "Bank line PRINCIPAL, debit 19,000, confirmed by the loan file as principal repaid. A financing outflow reducing the loan liability, with no effect on profit. Opening 100,000 plus the 50,000 advance less 19,000 gives 131,000, which agrees exactly with the independent bank confirmation.",
    evidence: ["E-02 bank line PRINCIPAL", "E-09 principal repaid", "E-11 bank confirmation 131,000"],
    confidence: "high",
  },
  {
    id: "D031",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Interest payments.",
    answer:
      "Bank line INT, debit 10,000 of interest paid, against an interest expense of 12,000 per the loan schedule. The 2,000 difference is accrued unpaid interest at 31 August and is independently confirmed by the bank. Expense of 12,000 charged to the P&L; 10,000 shown as cash paid; 2,000 carried as a liability.",
    evidence: ["E-02 bank line INT", "E-09 loan schedule interest 12,000", "E-11 accrued unpaid interest 2,000"],
    confidence: "high",
  },
  {
    id: "D032",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Villa deposit.",
    answer:
      "Bank line VILLA, 31 August 2026, debit 70,000, 'SUNSET VILLA RESERVATION'. The loan file records that the villa is in the founder's personal name and that no customer meeting occurred. The 'customer research' label fails any business-purpose test and the founder abandoned it himself in writing. Treated as an owner distribution charged to equity, not an expense.",
    evidence: ["E-02 bank line VILLA", "E-09 villa in founder's personal name", "E-10 page 2"],
    confidence: "high",
  },
  {
    id: "D033",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Owner card spending.",
    answer:
      "Bank line OWNERCARD, 31 August 2026, debit 40,000, \"Chairman's platinum card\". No supporting invoices and no business purpose evidenced. Same card, same period and same pattern as the villa. Treated as an owner distribution charged to equity. Together with the villa this is the 110,000 that the payroll file re-labels as a founder bonus.",
    evidence: ["E-02 bank line OWNERCARD", "E-09 other owner card spending 40,000", "E-07 founder 'bonus' cross-reference"],
    confidence: "high",
  },
  {
    id: "D034",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Insurance movement.",
    answer:
      "There is no insurance movement in the data room. The bank export contains no insurance payment across all 27 movements, no insurance invoice appears in the purchase file, and no prepaid or accrued insurance balance appears anywhere. Nil is recorded and the absence is reported rather than an amount estimated. Two observations follow: an eight-month period for a company with a warehouse and 260,000 of equipment showing no insurance cost is itself unusual, and stock was destroyed by a leaking pipe with no claim, policy or insurer correspondence on file.",
    evidence: ["E-02 complete bank export, no insurance line", "E-06 purchase invoices, no insurance invoice"],
    confidence: "low",
  },
  {
    id: "D035",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Water-damaged stock.",
    answer:
      "Marta's count on 31 August records basement 'premium' stock with a carrying value of 22,000 as physically present but wet and unsaleable, under a leaking pipe. The independent post-takeover stock assessment confirms it is not saleable and quotes 2,000 to remove it. Written down to nil, with a separate 2,000 provision for the disposal cost. The founder's position that 'if it still exists, it is inventory' confuses physical presence with recoverable value, which is exactly what the warehouse notes warn against.",
    evidence: ["E-05 basement stock 22,000", "E-11 independent stock assessment", "E-10 page 2 founder position"],
    confidence: "high",
  },
  {
    id: "D036",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Customer insolvency.",
    answer:
      "Return R-17: a customer balance of 18,000 within the Never Call Back web channel. The customer entered liquidation and the liquidator's notice, received 3 September, states that no distribution is expected. The contracts file records that the notice confirms a condition existing at 31 August, and the sales team knew on the day. It is an adjusting event: the receivable is written off in full at the reporting date.",
    evidence: ["E-04 Return R-17", "E-11 liquidator notice", "E-03 CRM WEB-NCB comment", "E-10 page 3"],
    confidence: "high",
  },
  {
    id: "D037",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Former employee claim.",
    answer:
      "External counsel wrote on 31 August, the reporting date itself, that a former employee claim is probable with a best estimate of 25,000 and a range of 20,000 to 30,000. The post-takeover confirmation repeats it. No payment had been made by 31 August. A provision of 25,000 is recognised. Management's omission on the grounds that 'negative energy reduces valuation' is evidence of pressure, not an accounting policy, as the file itself states.",
    evidence: ["E-09 counsel letter 31 August", "E-11 lawyer confirmation", "E-10 page 3"],
    confidence: "high",
  },
  {
    id: "D038",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Purchase total.",
    answer:
      "Period purchases are 459,000: BoxWorks 130,000, Glass & Drama 120,000, Print Again 95,000 and Event Things 114,000. Goods-received stamps are dated before 31 August and supplier balances are independently confirmed, so the whole amount belongs to the period on a goods-received basis rather than a payment-date basis. The figure is corroborated independently by the warehouse notes, which state the same 459,000. Unpaid at the reporting date: 126,000.",
    evidence: ["E-06 consolidated purchase invoices", "E-05 page 2 purchases 459,000"],
    confidence: "high",
  },
  {
    id: "D039",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Cash collections total.",
    answer:
      "Total collections from customers are 809,000: 35,000 opening receivable settlement, 180,000 NorthStar, 142,000 Freedom, 70,000 Phoenix, 95,000 Liberty, 250,000 Finally Single platform and 37,000 Never Call Back platform. The 90,000 of September deposits is excluded because it is not consideration for delivered work, and the 50,000 bank advance is excluded because it is financing.",
    evidence: ["E-02 all customer credit lines", "E-03 CRM cash matched column"],
    confidence: "high",
  },
  {
    id: "D040",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Closing bank balance.",
    answer:
      "Closing cash is 60,000. The bank export's own running balance ends at 60,000 on 31 August and the independent bank confirmation received after the takeover states 60,000. This is a three-way tie with the cash-flow roll-forward of 80,000 opening less 20,000 net outflow. Management's claimed 186,000 is rejected: the workbook admits it 'includes undeposited promises', and it is identical to management's receivables figure of 186,000, which indicates the entire receivables ledger was added to cash.",
    evidence: ["E-02 closing balance 60,000", "E-11 bank confirmation 60,000", "E-01 cash per management 186,000"],
    confidence: "high",
  },

  /* ============ D041-D070 classification ============ */
  {
    id: "D041",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify September customer deposits.",
    answer:
      "Contract liability of 90,000, not revenue. NB-SEP 60,000 for an event on 15 September and FF-SEP 30,000 for an event on 24 September, neither delivered by 31 August.",
    evidence: ["E-04 page 2 delivery dates", "E-02 lines DEP-NB and DEP-FF2", "E-03 CRM FUT-01 and FUT-02", "E-10 page 1"],
    confidence: "high",
    aiProposal:
      "Recognise nothing as revenue. Both deposits are cash received for performance obligations not yet satisfied, so 90,000 should sit as a contract liability and management's inclusion of it in August sales should be reversed.",
    independentChallenge:
      "The independent analysis reached the same conclusion and added the point that the founder's stated reasoning, that cash is cash and September is basically next week, is not an accounting policy, and that the bank narratives themselves say SEPT. It classified the balance as deferred revenue rather than a contract liability, which is the same liability under a different label.",
    studentReasoning:
      "Both analyses agree and the evidence is unambiguous. Revenue follows delivery of the promised goods or service, and the signed documents state in terms that nothing was delivered by 31 August. This is the single largest correction to revenue. I use the label contract liability because the obligation is to perform a specific event for a specific customer, which is more informative to the board than deferred revenue. The reversal does not touch cash: the 90,000 is in the bank and stays there, which is precisely why it is dangerous, because it looks like working capital and is not.",
    statementEffect: { profit: -90_000, cash: 0, assets: 0, liabilities: 90_000, equity: -90_000 },
    changedFromAI: false,
  },
  {
    id: "D042",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify New bank borrowing.",
    answer:
      "Financing inflow and an increase in debt of 50,000. Not income under any label.",
    evidence: ["E-09 signed agreement requiring repayment", "E-02 line LOAN-ADV", "E-01 'Strategic bank income' 50,000", "E-10 page 1"],
    confidence: "high",
    aiProposal:
      "Reclassify the 50,000 from income to debt. The agreement calls it a loan and requires repayment, and the bank narrative reads BALTIC BANK FACILITY.",
    independentChallenge:
      "The independent analysis agreed and strengthened the point with corroboration I had not used: principal of 19,000 was repaid against this facility during the period and it forms part of the 131,000 that the bank independently confirms. A sum that is repaid on a schedule and confirmed as principal cannot be income.",
    studentReasoning:
      "I accept the reinforced version. The decisive argument is not the label on the agreement but the behaviour of the money: it was drawn, it was partly repaid, and the bank confirms the outstanding principal. Borrowing increases cash and debt and never touches profit. The founder's instruction to call it other income because it sounds optimistic is recorded as attempted manipulation. This correction removes 50,000 of fictitious income while leaving cash untouched.",
    statementEffect: { profit: -50_000, cash: 0, assets: 0, liabilities: 50_000, equity: -50_000 },
    changedFromAI: false,
  },
  {
    id: "D043",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Packaging machine.",
    answer: "Capitalise 60,000 as property, plant and equipment, in use from 10 May and depreciated.",
    evidence: ["E-06 equipment invoice A-910", "E-02 line CAPEX-PACK", "E-08 management class 'Repair'"],
    confidence: "high",
    aiProposal:
      "Capitalise. A packaging machine installed and available for use on 10 May creates a long-term resource; management's classification of it as a repair is contradicted by the equipment invoice.",
    independentChallenge:
      "The independent analysis agreed and placed the disagreement in a wider pattern: management called a capital item a repair here, called another capital item marketing, and called a genuine repair capital. It argued that a real misunderstanding of the capitalisation rule would err consistently in one direction, so errors running in both directions indicate classifications chosen for effect.",
    studentReasoning:
      "I accept both the conclusion and the pattern argument, which I had not made and which I regard as the more important finding. Taken alone this item is a routine capitalisation question answered by a third-party invoice that outranks the management spreadsheet. Taken with D044 and D045 it is evidence that the classifications were selected rather than misunderstood, and that supports the recommendation for an override investigation at D097.",
    statementEffect: { profit: 60_000, cash: 0, assets: 60_000, liabilities: 0, equity: 60_000 },
    changedFromAI: false,
  },
  {
    id: "D044",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Photo booth.",
    answer: "Capitalise 20,000 as property, plant and equipment, available for use 10 May.",
    evidence: ["E-06 equipment invoice P-404", "E-02 line CAPEX-PHOTO", "E-08 management class 'Marketing expense'"],
    confidence: "high",
    aiProposal:
      "Capitalise. Invoice P-404 describes equipment available for use on 10 May, not advertising, and management's marketing label does not match the document.",
    independentChallenge:
      "The independent analysis agreed and sharpened the reasoning: the booth is a physical asset used to deliver the Divorce Victory Party events that generate revenue, so it is productive equipment rather than promotional spend. The word marketing in the management file describes the founder's intent, not the asset.",
    studentReasoning:
      "Agreed. The test is whether the spending creates a long-term resource the company controls and uses, and a photo booth deployed at events plainly does. The independent framing is better than mine because it identifies what the asset does rather than merely rejecting management's label. Capitalised and depreciated within the 24,000 charge at D074.",
    statementEffect: { profit: 20_000, cash: 0, assets: 20_000, liabilities: 0, equity: 20_000 },
    changedFromAI: false,
  },
  {
    id: "D045",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Machine belt and calibration.",
    answer: "Expense 10,000 as repairs and maintenance. Not capitalised.",
    evidence: ["E-06 invoice R-771", "E-02 line REPAIR", "E-08 management class 'PPE'"],
    confidence: "high",
    aiProposal:
      "Expense in full. Invoice R-771 states the work restored normal output and did not increase capacity or extend useful life, which is the definition of a repair.",
    independentChallenge:
      "The independent analysis agreed and noted that this error runs in the opposite direction to D043 and D044, which is what makes the set of three diagnostic rather than merely wrong.",
    studentReasoning:
      "Agreed, and the invoice language is as close to decisive as this case offers. Capitalising maintenance moves cost off the P&L and inflates assets, which is the same direction of travel as every other management choice in the file. Expensed in full, and the asset base is not increased.",
    statementEffect: { profit: -10_000, cash: 0, assets: -10_000, liabilities: 0, equity: -10_000 },
    changedFromAI: false,
  },
  {
    id: "D046",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Owner villa deposit.",
    answer:
      "Owner distribution of 70,000 charged to equity. Not a business expense and not payroll.",
    evidence: ["E-09 villa in founder's personal name, no customer meeting", "E-02 line VILLA", "E-10 page 2", "E-07 founder 'bonus'"],
    confidence: "high",
    aiProposal:
      "Treat as an owner distribution. The villa is in the founder's personal name, no customer meeting occurred, and the customer research label fails any business-purpose test.",
    independentChallenge:
      "The independent analysis agreed on distribution treatment and reasoned that the item is an extraction of owner value rather than a cost of trading, so it belongs in equity rather than the P&L. It then raised a presentation point I had not considered: if the board instead expensed the 110,000 of owner spending, reported profit would fall from 72,000 to negative 38,000 while closing equity stayed at 132,000, so this single presentation choice moves the headline by more than every measurement judgment combined.",
    studentReasoning:
      "I keep distribution treatment. Personal spending by an owner is a return of value to that owner unless genuine business purpose is evidenced, and here the evidence positively contradicts business purpose. The independent analysis is right that the board should make this choice knowingly rather than inherit it, so I have added it to the uncertainty register at U-07 and flagged it in the board recommendation. Note the effect: profit rises by 70,000 against management, who expensed it, but equity is unchanged, because the same 70,000 now reduces equity as a distribution. Nothing about the company's worth improves.",
    statementEffect: { profit: 70_000, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D047",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Owner card spending.",
    answer: "Owner distribution of 40,000 charged to equity. Not a business expense.",
    evidence: ["E-02 line OWNERCARD", "E-09 other owner card spending", "E-07 founder 'bonus' cross-reference"],
    confidence: "high",
    aiProposal:
      "Treat as an owner distribution. No supporting invoices and no business purpose evidenced, on the same card and in the same period as the villa.",
    independentChallenge:
      "The independent analysis agreed and identified a double-count trap I had noticed but not stated as sharply: the payroll file's founder bonus of 110,000 is the same money as the villa of 70,000 plus the card of 40,000, and the payroll file cross-references the owner card itself. Anyone recognising both the bonus and the card spending overstates costs by exactly 110,000.",
    studentReasoning:
      "Agreed, and the double-count warning is now a formal reconciliation in its own right so it cannot be lost. The same cash appears three times in this data room under three names: a villa reservation, a platinum card and a founder bonus with no employment approval. It is counted once, as a distribution of 110,000. This is the clearest single illustration of why the payroll spreadsheet cannot be relied on without the bank.",
    statementEffect: { profit: 40_000, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D048",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Physical product materials consumed.",
    answer:
      "Cost of sales of 396,000, derived as opening inventory 80,000 plus purchases 459,000 less the 31 August physical count of 143,000. The 405,000 asserted in the warehouse notes is not used.",
    evidence: ["E-05 opening 80,000, purchases 459,000, asserted consumption 405,000", "E-05 physical count 143,000", "E-06 purchases independently confirmed"],
    confidence: "medium",
    aiProposal:
      "Use 405,000 as stated in the warehouse notes for materials consumed on valid delivered sales, giving closing inventory of 134,000 gross and 112,000 after the damaged-stock write-off. Treat the physical count of 143,000 as the stale system value, since the file states the inventory system was not updated.",
    independentChallenge:
      "The independent analysis rejected 405,000 and derived 396,000 instead, anchoring on the physical count. Its reasoning: the count was performed on the reporting date by a named person after management had left, and it is a direct observation of what existed, whereas 405,000 is an assertion. It also pointed out that the count and the system agree with each other at 143,000, so the count is not an outlier against the system; the gap is between the flow figures and the stock figure. It further observed that the two most plausible explanations, overstated consumption or understated opening inventory, produce an identical closing balance sheet.",
    studentReasoning:
      "I changed my answer. My original position treated 143,000 as merely the stale system number, but it is not: Marta independently counted 79,000 and 42,000 and those agree with the system, which makes 143,000 a count-verified figure rather than an unverified one. Between a direct observation of closing stock on the reporting date and an asserted consumption total, the observation is the better evidence for a balance sheet, and the balance sheet is what the valuation will rest on. The consequence is that consumption becomes the derived balancing figure at 396,000 and profit is 9,000 higher than I first proposed. I record the 9,000 as the largest unresolved contradiction in the file at U-01 rather than smoothing it away, and I note that closing inventory of 121,000 and equity of 132,000 hold under either explanation of the gap, so the certified balance sheet is robust even though the profit split is not. The effect shown is measured against the 405,000 basis I originally proposed.",
    statementEffect: { profit: 9_000, cash: 0, assets: 9_000, liabilities: 0, equity: 9_000 },
    changedFromAI: true,
    agentsDisagreed: true,
  },
  {
    id: "D049",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Event staff payroll.",
    answer:
      "Cost of sales of 80,000. Reclassified out of administration, where management had placed it.",
    evidence: ["E-07 note 'Works directly on paid events'", "E-07 management treatment 'Admin'"],
    confidence: "high",
    aiProposal:
      "Reclassify to cost of sales. The payroll file's own note says the staff work directly on paid events, so this is direct service delivery cost, and the sales team's 72,000 should move the other way, out of COGS and into operating expenses.",
    independentChallenge:
      "The independent analysis agreed on both moves and quantified what management's split concealed: gross profit is 484,000, a 50.4 percent margin, on the corrected classification, against 492,000 and 51.3 percent on management's. It noted that both reclassifications ran in the direction that flatters gross margin, which again suggests deliberate placement.",
    studentReasoning:
      "Agreed. Net profit is identical either way, which is exactly why this matters: the error is invisible at the bottom line and material to every margin the board would look at when valuing the business. Direct event staff are the cost of delivering the Divorce Victory Party product and belong above the gross profit line; a commercial sales and partnerships team does not. I have quantified the margin effect in the schedules so an assessor can see that a nil profit impact is not the same as a nil impact.",
    statementEffect: { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D050",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Sales team payroll.",
    answer:
      "Operating expense of 72,000, within selling costs. Reclassified out of cost of sales, where management had placed it. A commercial sales and partnerships function wins work; it does not deliver it, so it sits below gross profit.",
    evidence: ["E-07 'Sales and partnerships', management treatment 'COGS'", "E-07 note 'Commercial team'"],
    confidence: "high",
  },
  {
    id: "D051",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Office payroll.",
    answer:
      "Operating expense of 96,000, administrative. Management's classification is accepted as correct here. Note that it includes the former finance manager who prepared the workbook this reconstruction rejects.",
    evidence: ["E-07 'Office and finance' 96,000, management treatment 'Admin'"],
    confidence: "high",
  },
  {
    id: "D052",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Rent.",
    answer:
      "Operating expense of 48,000 for January to August, charged in full to the period. No lease documentation exists, so no right-of-use asset, lease liability, prepayment or accrual can be assessed.",
    evidence: ["E-02 bank line RENT 48,000"],
    confidence: "medium",
  },
  {
    id: "D053",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Marketing.",
    answer:
      "Operating expense of 55,000 covering Meta, TikTok and influencer spend. The 20,000 photo booth is excluded because it is equipment, and the 70,000 villa is excluded because it is a distribution, notwithstanding management's instructions to place both here.",
    evidence: ["E-02 bank line MKT 55,000", "E-08 photo booth 'Marketing expense'", "E-10 page 2 villa instruction"],
    confidence: "high",
  },
  {
    id: "D054",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Software.",
    answer:
      "Operating expense of 16,000. Subscriptions confer no controlled long-term resource, so nothing is capitalised. No prepaid element is evidenced at 31 August.",
    evidence: ["E-02 bank line SOFT 16,000"],
    confidence: "high",
  },
  {
    id: "D055",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Utilities.",
    answer:
      "Operating expense of 12,000. No accrued or unbilled balance is evidenced at 31 August, which is assumed nil and flagged as optimistic given that payroll and suppliers both carried material unpaid balances.",
    evidence: ["E-02 bank line UTIL 12,000"],
    confidence: "medium",
  },
  {
    id: "D056",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Depreciation.",
    answer:
      "Non-cash operating expense of 24,000 for the period. Management booked nil.",
    evidence: ["E-08 'Period depreciation 0, Not booked', independent schedule estimates 24,000", "E-08 opening accumulated depreciation 45,000"],
    confidence: "medium",
    aiProposal:
      "Book 24,000. Assets in use must be depreciated and management's nil charge is indefensible; the independent schedule is the only estimate available and it should be accepted.",
    independentChallenge:
      "The independent analysis accepted the same 24,000 but attached a scope limitation I had not stated: the data room contains no useful lives, no rates, no residual values and no asset register, so the 24,000 can be accepted as an independent estimate but cannot be recomputed or audited. It treated this as a qualification on the figure rather than a reason to change it.",
    studentReasoning:
      "I keep 24,000 and adopt the qualification. The existence of a charge is not in doubt: 260,000 of equipment was in use, two items from 10 May, and a nil charge cannot be right. The amount rests on a single independent schedule that I cannot verify by recomputation, which is why confidence is medium rather than high despite the conclusion being obvious. I have recorded the missing depreciation policy in U-09 as a scope limitation. A board asked to value this business should obtain the asset register before relying on the net book value of 191,000.",
    statementEffect: { profit: -24_000, cash: 0, assets: -24_000, liabilities: 0, equity: -24_000 },
    changedFromAI: false,
  },
  {
    id: "D057",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Bad receivable.",
    answer:
      "Expense of 18,000 and a corresponding reduction in trade receivables. R-17 is written off in full at 31 August.",
    evidence: ["E-04 Return R-17, customer in liquidation", "E-11 liquidator notice, no distribution expected", "E-10 page 3"],
    confidence: "high",
    aiProposal:
      "Write off 18,000 in full. The liquidator's notice arrived on 3 September but confirms a condition that existed at 31 August, which makes it an adjusting event.",
    independentChallenge:
      "The independent analysis agreed and added corroboration from the message dump: the sales team recorded on the day that the 18,000 would not be collected, so the company had internal knowledge at the reporting date independent of the liquidator. It framed the founder's response, that a zero is emotionally aggressive, as not a reason to carry a worthless asset.",
    studentReasoning:
      "Agreed. The contracts file itself states that the notice confirms a condition existing at 31 August, which settles the adjusting-event question without my having to argue it. The extra corroboration matters because it shows the knowledge was internal and contemporaneous, not merely hindsight. Written off rather than provided against, because no recovery is expected at all: a provision implies doubt, and the liquidator has removed the doubt.",
    statementEffect: { profit: -18_000, cash: 0, assets: -18_000, liabilities: 0, equity: -18_000 },
    changedFromAI: false,
  },
  {
    id: "D058",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Damaged stock.",
    answer:
      "Write-off of 22,000 charged to expense, reducing inventory to nil on that stock line.",
    evidence: ["E-05 basement stock wet, cannot be sold", "E-11 independent stock assessment, not saleable", "E-10 page 2 warehouse message"],
    confidence: "high",
    aiProposal:
      "Write off 22,000 in full. Inventory is carried at the lower of cost and net realisable value, and three sources agree the net realisable value is nil.",
    independentChallenge:
      "The independent analysis agreed on the 22,000 and went further on the disposal cost, arguing that net realisable value is properly selling price less costs to sell, which here is nil less 2,000, so the correct answer is a 22,000 write-down plus a separate 2,000 liability rather than a 22,000 write-down alone. That extension is dealt with at D072.",
    studentReasoning:
      "Agreed on the 22,000, which is the strongest-evidenced adjustment in the case: Marta's count, the warehouse message and an independent post-takeover assessment all say the same thing. The founder's position that if it still exists it is inventory is the precise error the warehouse notes warn against, namely confusing quantities physically present with recoverable financial value. The disposal cost extension is accepted separately at D072.",
    statementEffect: { profit: -22_000, cash: 0, assets: -22_000, liabilities: 0, equity: -22_000 },
    changedFromAI: false,
  },
  {
    id: "D059",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Probable legal claim.",
    answer:
      "Provision of 25,000 recognised as a liability with a matching expense.",
    evidence: ["E-09 counsel letter 31 August, probable, best estimate 25,000, range 20,000-30,000", "E-11 lawyer confirmation", "E-10 page 3"],
    confidence: "high",
    aiProposal:
      "Recognise 25,000. An obligation arising from a past event is probable and can be reliably estimated, and counsel gave a best estimate.",
    independentChallenge:
      "The independent analysis agreed and emphasised a date point I had underused: counsel wrote on 31 August, the reporting date itself, so this is not a post-period-end matter requiring an adjusting-event argument at all. It also noted that where a range exists and no point within it is more likely, the best estimate governs, and counsel supplied one.",
    studentReasoning:
      "Agreed, and the date point is the cleaner argument. I had reasoned by analogy to the R-17 adjusting event, but no such reasoning is needed here: the legal opinion is dated at the reporting date, so the condition and the evidence are both contemporaneous. 25,000 is taken as counsel's best estimate rather than the midpoint by coincidence. The 20,000 to 30,000 range is disclosed at U-02. Management's stated reason for omitting it is recorded as pressure.",
    statementEffect: { profit: -25_000, cash: 0, assets: 0, liabilities: 25_000, equity: -25_000 },
    changedFromAI: false,
  },
  {
    id: "D060",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Insurance consumed.",
    answer:
      "Nil. No insurance expense can be classified because no insurance transaction, invoice, policy or balance exists anywhere in the data room. The absence is reported rather than an amount estimated. See D034 and U-04.",
    evidence: ["E-02 complete bank export, no insurance line", "E-06 purchase invoices, no insurance invoice"],
    confidence: "low",
  },
  {
    id: "D061",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Unpaid interest.",
    answer:
      "Accrued liability of 2,000, being interest expense of 12,000 per the loan schedule less 10,000 actually paid per the bank. Independently confirmed by the bank at 2,000.",
    evidence: ["E-09 interest expense 12,000", "E-02 bank line INT 10,000", "E-11 accrued unpaid interest 2,000"],
    confidence: "high",
  },
  {
    id: "D062",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Unpaid payroll.",
    answer:
      "Accrued liability of 32,000, being the opening accrual of 15,000 plus expense of 248,000 less cash paid of 231,000. The payroll file states the closing amount was not calculated by management.",
    evidence: ["E-07 opening unpaid payroll 15,000, expense 248,000, cash paid 231,000", "E-02 bank line PAYROLL 231,000"],
    confidence: "high",
  },
  {
    id: "D063",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Unpaid suppliers.",
    answer:
      "Trade payables of 126,000, independently confirmed supplier by supplier: BoxWorks 25,000, Glass & Drama 28,000, Print Again 14,000 and Event Things 59,000. Goods-received stamps predate 31 August so all of it belongs to the period.",
    evidence: ["E-06 unpaid balances totalling 126,000, independently confirmed"],
    confidence: "high",
  },
  {
    id: "D064",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Delivered NorthStar contract.",
    answer: "Revenue of 180,000 recognised on 12 February 2026. Fully collected.",
    evidence: ["E-04 INV-26012 accepted 12 Feb", "E-02 line RCPT-NS 180,000", "E-03 CRM C-001"],
    confidence: "high",
    aiProposal:
      "Recognise 180,000 in full on delivery. Signed invoice, customer acceptance dated 12 February and matching cash receipt.",
    independentChallenge:
      "The independent analysis agreed and called this the strongest-evidenced item in the file, since signed acceptance, invoice and full cash settlement all coincide. It addressed the three spellings of the customer name directly, concluding that a customer recorded as North Star, N STAR and NorthStar Events is a data-hygiene weakness rather than a recognition issue, because the amount and date tie exactly.",
    studentReasoning:
      "Agreed, and this item is the control against which the weaker ones are measured. Management also recognised it, so there is no correction, but certifying it matters because it establishes that the company has real revenue and that the 960,000 is not itself in doubt. The naming inconsistency is noted as a reason the CRM cannot be relied on for counterparty analysis; I searched for duplicated revenue arising from it and found none.",
    statementEffect: { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D065",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Delivered Freedom contract.",
    answer:
      "Revenue of 200,000 recognised on 18 March 2026. 142,000 collected, 58,000 outstanding at the reporting date.",
    evidence: ["E-04 INV-26031 accepted 18 Mar", "E-02 line RCPT-FF 142,000", "E-03 CRM C-002"],
    confidence: "high",
    aiProposal:
      "Recognise the full 200,000 on acceptance, not the 142,000 collected. Collection status does not affect recognition; the unpaid 58,000 is a receivable.",
    independentChallenge:
      "The independent analysis reached the same figure and noted there is no evidence of dispute, return or credit note against the outstanding 58,000, so no allowance is warranted beyond the specific R-17 write-off. It read the bank narrative 1/2 as confirming that a second instalment was contemplated.",
    studentReasoning:
      "Agreed. Delivery was accepted on 18 March and that is when the obligation was satisfied, so the whole 200,000 is revenue of the period. This is the clearest illustration for the board of profit not being cash: a 58,000 gap between what was earned and what arrived, on a customer that has not disputed anything. I record no allowance because none is evidenced, while noting in U-06 that the remaining receivables carry real risk.",
    statementEffect: { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D066",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Completed Phoenix event.",
    answer:
      "Revenue of 100,000 recognised on 29 April 2026 when the event was completed. 70,000 collected, 30,000 outstanding.",
    evidence: ["E-04 INV-26047 completed 29 Apr, acceptance by customer email", "E-02 line RCPT-PHX 70,000", "E-03 CRM C-003"],
    confidence: "medium",
    aiProposal:
      "Recognise 100,000 on completion of the event on 29 April. The service was performed and the customer part-paid.",
    independentChallenge:
      "The independent analysis reached the same figure but identified this as the least-supported revenue item in the case and quantified the exposure: final acceptance is an email rather than a signed acceptance, and the customer appears as Phoenix People in the CRM but Phoenix HR in the contracts file. If the item failed, revenue would fall by 100,000 and receivables by 30,000.",
    studentReasoning:
      "I keep 100,000 but I adopt the lower confidence, which I had not applied. Performance is evidenced three ways: a completion date, a part payment of 70,000 through the bank, and a CRM status of Won, and the customer has never disputed. That is sufficient to recognise. But an email acceptance sits below a signed acceptance in the reliability ranking the board set, and the name mismatch means I cannot fully verify the counterparty from the file. This is the one revenue item where I would want a signed confirmation before completing a valuation, and I have said so to the board.",
    statementEffect: { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: true,
    agentsDisagreed: true,
  },
  {
    id: "D067",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Delivered Liberty order.",
    answer:
      "Revenue of 120,000 recognised on 20 June 2026. 95,000 collected, 25,000 outstanding.",
    evidence: ["E-04 INV-26063 delivered 20 Jun, written acceptance in full", "E-02 line RCPT-LIB 95,000", "E-03 CRM C-004"],
    confidence: "high",
    aiProposal:
      "Recognise 120,000 on delivery. The customer confirmed in writing that the order was accepted in full.",
    independentChallenge:
      "The independent analysis agreed and dealt with the complaint explicitly: the customer wrote that the glitter was excessive, which was exactly the point, and accepted in full. An expression of feeling about a delivered product is not a rejection and does not create a return obligation.",
    studentReasoning:
      "Agreed. The file is titled Contracts, Returns and Angry Customers, which invites the reader to treat the complaint as a return; it is not one. The written acceptance is explicit and is the strongest form of acceptance evidence in the case after full cash settlement. No return provision is raised because no return was requested and no credit note exists.",
    statementEffect: { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D068",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Undelivered September events.",
    answer:
      "No revenue. 90,000 held as a contract liability until the events are delivered on 15 and 24 September 2026.",
    evidence: ["E-04 page 2, no goods or service delivered by 31 August", "E-03 CRM FUT-01 and FUT-02", "E-02 lines DEP-NB and DEP-FF2"],
    confidence: "high",
    aiProposal:
      "Recognise nothing. Neither event had occurred by the reporting date, so no performance obligation was satisfied.",
    independentChallenge:
      "The independent analysis agreed and raised a completeness point I had missed: if the deposits are deferred, any costs already incurred on those two September events should logically be deferred with them. It found no cost data for the events anywhere in the data room and therefore assumed nil, flagging the assumption rather than estimating.",
    studentReasoning:
      "Agreed, and the matching point is a fair challenge that I have adopted as a disclosed assumption at U-09 rather than an adjustment, because inventing a cost figure would be worse than stating that none is evidenced. The CRM records both as Won, which is a sales status and not a revenue test, and management relied on exactly that conflation. This is the same adjustment as D041 seen from the revenue side rather than the cash side, so the 90,000 is counted once.",
    statementEffect: { profit: -90_000, cash: 0, assets: 0, liabilities: 90_000, equity: -90_000 },
    changedFromAI: false,
    aggregationNote: "Same adjustment as D041. Counted once in the statements and once in the profit bridge.",
  },
  {
    id: "D069",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Loan principal payment.",
    answer:
      "Financing outflow of 19,000 reducing the loan liability. No effect on profit. Interest is dealt with separately at D031 and D061.",
    evidence: ["E-02 bank line PRINCIPAL 19,000", "E-09 principal repaid 19,000"],
    confidence: "high",
  },
  {
    id: "D070",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Equipment purchase.",
    answer:
      "Investing outflow of 80,000, being the Pack-O-Matic at 60,000 and the photo booth at 20,000. Both are capitalised to PPE rather than expensed, so neither reduces profit on purchase.",
    evidence: ["E-02 lines CAPEX-PACK and CAPEX-PHOTO", "E-06 invoices A-910 and P-404"],
    confidence: "high",
  },

  /* ============ D071-D090 estimation ============ */
  {
    id: "D071",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Closing bad-debt allowance/write-off and document the basis.",
    answer:
      "18,000, being the specific write-off of R-17. No general allowance is raised. Gross receivables of 186,000 reduce to 168,000 net.",
    evidence: ["E-04 Return R-17 18,000", "E-11 liquidator notice", "E-03 CRM WEB-NCB 53,000 open"],
    confidence: "medium",
    aiProposal:
      "Write off 18,000 by specific identification and raise no general allowance, since no other customer is evidenced as doubtful.",
    independentChallenge:
      "The independent analysis agreed on the 18,000 but argued the absence of a general allowance deserves a warning rather than silence, quantifying why: Never Call Back has 53,000 open on 90,000 invoiced, a 59 percent non-collection rate, against Finally Single's 7 percent. It called that a red flag with no supporting ageing data and suggested a general provision may be warranted once ageing is obtained.",
    studentReasoning:
      "I keep 18,000 as the booked figure and adopt the warning. Raising a general allowance without an ageing analysis would be substituting a guess for evidence, which the board order forbids as firmly as it forbids management's optimism. But the divergence between the two web channels is real and I had not quantified it. I have widened the uncertainty range at U-06 to 35,000 of potential further impairment and made the ageing analysis a board action at D095. Both analyses agree on the number booked; the difference is how loudly the risk is stated.",
    statementEffect: { profit: -18_000, cash: 0, assets: -18_000, liabilities: 0, equity: -18_000 },
    changedFromAI: false,
    aggregationNote: "Same adjustment as D057. Counted once in the statements and once in the profit bridge.",
  },
  {
    id: "D072",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Damaged inventory write-off and document the basis.",
    answer:
      "22,000 written off against inventory (carried at D058), plus a 2,000 disposal provision retained as a labelled assumption rather than a required accrual. Total charge shown 24,000; the disclosure-only alternative is 22,000, which certifies profit at 74,000 instead of 72,000. See U-10.",
    evidence: ["E-05 basement stock 22,000, disposal quote 2,000 not included in carrying value", "E-11 independent stock assessment"],
    confidence: "low",
    aiProposal:
      "Write off 22,000 only. Disclose the 2,000 disposal quote but do not accrue it, because at 31 August no disposal had been commissioned and no obligating event had occurred.",
    independentChallenge:
      "The independent analysis provided for the 2,000 as well, on a measurement rather than an obligation argument: inventory is carried at the lower of cost and net realisable value, and net realisable value is selling price less costs to sell, which here is nil less 2,000, so net realisable value is negative. A negative net realisable value cannot be carried as a negative asset, so the correct presentation is a 22,000 write-down of the asset plus a 2,000 liability.",
    studentReasoning:
      "On review, the independent analysis's framing does not hold on its own: IAS 37 requires a present legal or constructive obligation arising from a past event before a cost can be accrued as a liability, and a disposal quote obtained for costing purposes is not an obligating event by itself. At 31 August nothing had been commissioned, ordered or publicly committed to, so no present obligation is evidenced. The 'negative net realisable value' argument is a measurement heuristic, not a substitute for that test, and it also proves too much: inventory cannot be carried below nil, so the 22,000 write-down already exhausts the asset carried at D058, and the 2,000 is not a write-down of anything, it is a forecast of future spending. I am retaining the 2,000 as an explicit, disclosed assumption rather than a required accrual, because the goods physically cannot be sold or stored indefinitely and removal is highly probable in substance even without a signed order. That is a conservatism choice the board should see clearly, not an automatic consequence of the measurement rule. Confidence is downgraded to low to flag that this line is assumption-driven. The fully defensible no-provision alternative, disclosing the 2,000 as a note only, is documented at U-10: it raises certified profit to 74,000, cuts liabilities to 406,000 and raises equity to 134,000, and the balance sheet still balances.",
    statementEffect: { profit: -2_000, cash: 0, assets: 0, liabilities: 2_000, equity: -2_000 },
    changedFromAI: true,
    agentsDisagreed: true,
    aggregationNote:
      "The 22,000 write-off is carried by D058. This decision carries only the 2,000 disposal provision, so the two together charge 24,000 once. The provision is a labelled assumption, not a required accrual — see U-10 for the 74,000 no-provision alternative.",
  },
  {
    id: "D073",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Legal provision and document the basis.",
    answer:
      "25,000, being external counsel's best estimate at the reporting date. Range 20,000 to 30,000 disclosed.",
    evidence: ["E-09 counsel letter 31 August", "E-11 lawyer confirmation, range 20,000-30,000"],
    confidence: "medium",
    aiProposal:
      "Provide 25,000, counsel's best estimate and the midpoint of the stated range.",
    independentChallenge:
      "The independent analysis agreed on 25,000 but corrected the basis: it should be taken because counsel identified it as the best estimate, not because it happens to be the midpoint. Where a range exists and no outcome within it is more likely than another, the best estimate governs, and here one was supplied rather than having to be inferred.",
    studentReasoning:
      "I keep the figure and accept the correction to the reasoning, which is not merely semantic. If I justify 25,000 as a midpoint, I am implicitly saying I computed it, and I would have to defend that computation. Counsel gave a best estimate; the correct basis is to adopt it and disclose the range around it. Confidence is medium rather than high because the outcome of litigation is inherently uncertain, not because the evidence is weak. The 5,000 either way is disclosed at U-02.",
    statementEffect: { profit: -25_000, cash: 0, assets: 0, liabilities: 25_000, equity: -25_000 },
    changedFromAI: false,
    aggregationNote: "Same adjustment as D059. Counted once in the statements and once in the profit bridge.",
  },
  {
    id: "D074",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Period depreciation and document the basis.",
    answer:
      "24,000 for the period, per the independent schedule. Accumulated depreciation moves from 45,000 to 69,000.",
    evidence: ["E-08 independent schedule estimates 24,000, management booked nil", "E-08 opening accumulated depreciation 45,000"],
    confidence: "medium",
    aiProposal:
      "Book 24,000 from the independent schedule. It is the only estimate in the file and management's nil is not a defensible alternative.",
    independentChallenge:
      "The independent analysis accepted 24,000 on the same basis but declined to treat it as verified, noting that with no useful lives, rates, residual values or asset register in the data room the figure cannot be recomputed. It also observed that the two May additions were in use for under four months of the eight-month period, so the charge is not a simple full-period calculation on the closing cost.",
    studentReasoning:
      "I keep 24,000 and adopt the qualification. The point about the May additions is a good one and cuts in favour of the estimate rather than against it: a naive full-period charge on 260,000 of cost would be higher than 24,000, so the independent schedule appears to have been prepared with some regard to timing rather than pulled from the air. That raises my comfort with the number while leaving me unable to verify it. Confidence stays medium and the missing depreciation policy is recorded as a scope limitation at U-09. A board relying on the 191,000 net book value should obtain the asset register first.",
    statementEffect: { profit: -24_000, cash: 0, assets: -24_000, liabilities: 0, equity: -24_000 },
    changedFromAI: false,
    aggregationNote: "Same adjustment as D056. Counted once in the statements and once in the profit bridge.",
  },
  {
    id: "D075",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Closing inventory and document the basis.",
    answer:
      "121,000, being the 31 August physical count of 143,000 less the 22,000 of unsaleable basement stock. Range 112,000 to 121,000 disclosed.",
    evidence: ["E-05 count: 79,000 + 42,000 good stock, 22,000 damaged", "E-05 opening 80,000, purchases 459,000, asserted consumption 405,000", "E-06 purchases independently confirmed"],
    confidence: "medium",
    aiProposal:
      "112,000. Derive closing inventory from the roll-forward using the stated consumption of 405,000, giving 134,000 gross less the 22,000 write-off, and treat the 143,000 as the stale system figure.",
    independentChallenge:
      "The independent analysis derived 121,000 instead, anchoring the balance sheet on the physical count and letting consumption fall out as the balancing figure at 396,000. Its supporting observation was that the two most plausible explanations for the 9,000 gap, overstated consumption or understated opening inventory, produce an identical closing balance sheet and closing equity, so the closing position is robust at 121,000 and 132,000 either way, and only the period profit split moves.",
    studentReasoning:
      "I changed my answer to 121,000. The decisive point is which figure the balance sheet should be anchored on, and a physical count taken on the reporting date by a named person after management had left is better evidence of what existed than an assertion about what was consumed. I had dismissed the 143,000 as a stale system value, but Marta counted the two good lines independently and they agreed, which makes it count-verified. The corollary that the closing position holds under either explanation of the gap is what gives me confidence to certify 121,000 while openly stating I cannot close a 9,000 difference. The effect shown is measured against my original 112,000 proposal and is already carried at D048; no additional euro enters the statements here.",
    statementEffect: { profit: 9_000, cash: 0, assets: 9_000, liabilities: 0, equity: 9_000 },
    changedFromAI: true,
    agentsDisagreed: true,
    aggregationNote: "Same adjustment as D048. Counted once in the statements and once in the profit bridge.",
  },
  {
    id: "D076",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Closing receivables and document the basis.",
    answer:
      "168,000 net. Basis: opening 35,000 plus revenue 960,000 less collections 809,000 gives 186,000 gross, less the 18,000 R-17 write-off. The gross figure is independently proved by summing the open balances per customer: Freedom 58,000, Phoenix 30,000, Liberty 25,000, Finally Single platform 20,000 and Never Call Back 53,000.",
    evidence: ["E-03 CRM open balances", "E-02 collections", "E-04 Return R-17"],
    confidence: "high",
  },
  {
    id: "D077",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Repair versus improvement amount and document the basis.",
    answer:
      "Repair 10,000, improvement nil. Basis: invoice R-771 states the work restored normal output and did not increase capacity or extend useful life, so no part of it qualifies for capitalisation. No apportionment is required because the invoice is explicit that the whole of the work was restorative.",
    evidence: ["E-06 invoice R-771", "E-02 bank line REPAIR 10,000"],
    confidence: "high",
  },
  {
    id: "D078",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Insurance expense and document the basis.",
    answer:
      "Nil, with no basis available. The data room contains no insurance payment, invoice, policy or balance of any kind. Estimating an amount would mean inventing evidence, which the board order forbids. The absence is itself reported: stock was destroyed by a leaking pipe and no claim appears anywhere, so no insurance recovery is assumed against the 22,000 write-off. See U-04.",
    evidence: ["E-02 complete bank export, no insurance line", "E-06 purchase invoices, no insurance invoice"],
    confidence: "low",
  },
  {
    id: "D079",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Interest payable and document the basis.",
    answer:
      "2,000. Basis: interest expense of 12,000 per the loan schedule less 10,000 paid per the bank export. The figure is independently confirmed by the post-takeover bank confirmation, so it is proved rather than estimated.",
    evidence: ["E-09 interest expense 12,000", "E-02 bank line INT 10,000", "E-11 accrued unpaid interest 2,000"],
    confidence: "high",
  },
  {
    id: "D080",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Accrued payroll and document the basis.",
    answer:
      "32,000. Basis: opening accrual 15,000 plus period expense 248,000 less cash paid 231,000. Cash paid agrees exactly to the bank line, and the payroll file records that management never calculated the closing figure.",
    evidence: ["E-07 opening 15,000, expense 248,000, cash paid 231,000", "E-02 bank line PAYROLL 231,000"],
    confidence: "high",
  },
  {
    id: "D081",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Customer deposit liability and document the basis.",
    answer:
      "90,000. Basis: two identified deposits, NB-SEP 60,000 received 28 August for a 15 September event and FF-SEP 30,000 received 29 August for a 24 September event. Both remain wholly unearned at the reporting date, so the liability equals the cash received in full with no partial recognition.",
    evidence: ["E-04 page 2", "E-02 lines DEP-NB and DEP-FF2", "E-03 CRM FUT-01 and FUT-02"],
    confidence: "high",
  },
  {
    id: "D082",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate PPE closing cost and document the basis.",
    answer:
      "260,000. Basis: opening cost 180,000 plus the Pack-O-Matic at 60,000 and the photo booth at 20,000, both evidenced by equipment invoices and both available for use from 10 May. The 10,000 belt and calibration is excluded because it is a repair.",
    evidence: ["E-08 opening PPE cost 180,000", "E-06 invoices A-910 and P-404", "E-06 invoice R-771"],
    confidence: "high",
  },
  {
    id: "D083",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Accumulated depreciation and document the basis.",
    answer:
      "69,000. Basis: opening accumulated depreciation of 45,000 plus the period charge of 24,000 from the independent schedule. Net book value 191,000. The underlying depreciation policy is not in the data room, so the charge is accepted rather than recomputed.",
    evidence: ["E-08 opening accumulated depreciation 45,000", "E-08 independent schedule 24,000"],
    confidence: "medium",
  },
  {
    id: "D084",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Supplier payable and document the basis.",
    answer:
      "126,000. Basis: the independently confirmed unpaid balances of the four suppliers. Cross-proved by the roll-forward of opening payables 45,000 plus purchases 459,000 less cash paid 378,000, where the opening figure is itself evidenced by the 45,000 overpayment to Event Things rather than being a plug.",
    evidence: ["E-06 unpaid balances 126,000 independently confirmed", "E-02 supplier payment lines totalling 378,000"],
    confidence: "high",
  },
  {
    id: "D085",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Closing loan and document the basis.",
    answer:
      "131,000. Basis: opening principal 100,000 plus the 50,000 March advance less 19,000 repaid. Independently confirmed at 131,000 by the post-takeover bank confirmation, so both ends of the schedule are externally proved.",
    evidence: ["E-09 opening loan 100,000, advance 50,000, principal repaid 19,000", "E-11 bank confirmation 131,000"],
    confidence: "high",
  },
  {
    id: "D086",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Physical COGS and document the basis.",
    answer:
      "396,000 of materials, plus 80,000 of direct event delivery payroll, giving total cost of sales of 476,000. Basis: opening inventory 80,000 plus purchases 459,000 less the 31 August physical count of 143,000. The 405,000 asserted in the warehouse notes is not used; the 9,000 difference is the case's principal unresolved contradiction and is disclosed at U-01. See D048.",
    evidence: ["E-05 count 143,000, opening 80,000, purchases 459,000", "E-06 purchases independently confirmed", "E-07 event delivery staff 80,000"],
    confidence: "medium",
  },
  {
    id: "D087",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Service direct payroll and document the basis.",
    answer:
      "80,000, being the event delivery staff. Basis: the payroll file's own note that these staff work directly on paid events, which makes them a direct cost of delivering the Divorce Victory Party product. Management had classified them as administration. Cash paid on this line was 75,000 against expense of 80,000.",
    evidence: ["E-07 event delivery staff 80,000, note 'Works directly on paid events'"],
    confidence: "high",
  },
  {
    id: "D088",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Owner distributions and document the basis.",
    answer:
      "110,000. Basis: the villa reservation of 70,000 and the owner card spending of 40,000, both taken from the bank on 31 August. This is the same 110,000 that the payroll file records as a founder bonus with no employment approval; it is the same money described twice and is counted once.",
    evidence: ["E-02 lines VILLA and OWNERCARD", "E-09 owner villa and card amounts", "E-07 founder 'bonus' 110,000"],
    confidence: "high",
  },
  {
    id: "D089",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Net profit and document the basis.",
    answer:
      "72,000. Basis: revenue 960,000 less cost of sales 476,000 gives gross profit of 484,000; less operating expenses of 400,000 gives operating profit of 84,000; less interest of 12,000. Management claimed 312,000, an overstatement of 240,000 made up of 140,000 of overstated revenue and 100,000 of understated costs. Range across all uncertainties: 58,000 to 79,000.",
    evidence: ["Schedules 1 to 8", "E-01 management profit 312,000"],
    confidence: "medium",
  },
  {
    id: "D090",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Closing cash and document the basis.",
    answer:
      "60,000. Basis: a three-way tie between the bank export's closing running balance, the independent post-takeover bank confirmation, and the cash-flow roll-forward of 80,000 opening plus 149,000 operating less 80,000 investing less 89,000 financing. This is the most strongly evidenced figure in the reconstruction. Management's 186,000 is rejected.",
    evidence: ["E-02 closing balance 60,000", "E-11 bank confirmation 60,000", "E-01 cash per management 186,000"],
    confidence: "high",
  },

  /* ============ D091-D100 board decisions ============ */
  {
    id: "D091",
    category: "board_decision",
    reviewTier: "material_judgment",
    question: "Approve corrected accounts before valuation",
    answer:
      "Yes. Approve the corrected accounts, together with the disclosed uncertainty ranges, and refuse to value the business on any other basis.",
    evidence: ["All twelve reconciliations pass", "E-01 workbook labelled 'not reconciled', formulas replaced with values", "E-11 external confirmations"],
    confidence: "high",
    aiProposal:
      "Approve. The corrected accounts reconcile to bank, contract, supplier, warehouse, loan and legal evidence, whereas the management workbook reconciles to nothing and admits its formulas were replaced with values.",
    independentChallenge:
      "The independent analysis agreed but attached a condition I had not made explicit: the accounts should be approved together with the uncertainty ranges rather than as single-point figures, because presenting 72,000 as precise would repeat management's error of false precision in the opposite direction. It also recommended obtaining the insurance and lease files before completing the valuation.",
    studentReasoning:
      "I accept the condition and have built it into the recommendation. The point is well made: a reconstruction that survives twelve reconciliations is reliable, but reliable is not exact, and the board is about to price a business on this number. So the approval is of a certified position of 72,000 with a stated range of 58,000 to 79,000, a 9,000 inventory contradiction I cannot close, and two file requests outstanding. The two missing files matter in different ways. Insurance is bounded, because the exposure is at most the 22,000 already written off. Leases are not bounded at all, because 48,000 of rent was paid with no contract on file and a right-of-use asset could be material. That is a condition of the valuation, not of the approval.",
    statementEffect: { profit: null, cash: null, assets: null, liabilities: null, equity: null },
    changedFromAI: false,
  },
  {
    id: "D092",
    category: "board_decision",
    reviewTier: "operational",
    question: "Freeze owner-card access",
    answer:
      "Yes, immediately and before any other action. 110,000 left the company on management signature alone in the final days before the takeover, with no approval, no invoices and no business purpose evidenced, and was labelled three different ways across three files. The card and the founder's bank authority should both be revoked today, and recovery of the 110,000 referred to counsel as a legal question rather than treated as a cost of doing business.",
    evidence: ["E-02 lines VILLA 70,000 and OWNERCARD 40,000", "E-09 villa in founder's personal name", "E-07 founder 'bonus', no employment approval"],
    confidence: "high",
  },
  {
    id: "D093",
    category: "board_decision",
    reviewTier: "operational",
    question: "Move September deposits to contract liabilities",
    answer:
      "Yes, and ring-fence the cash in a separate account. The 90,000 is customer money for events on 15 and 24 September that have not been delivered. Reclassification alone is not enough: the cash sits in the same account that funds payroll and suppliers, so without segregation the company would be financing itself with its own unearned revenue. Net of the deposits, the real cash position is negative 30,000.",
    evidence: ["E-04 page 2 delivery dates", "E-02 lines DEP-NB and DEP-FF2", "E-11 bank confirmation cash 60,000"],
    confidence: "high",
  },
  {
    id: "D094",
    category: "board_decision",
    reviewTier: "operational",
    question: "Begin weekly 13-week cash forecast",
    answer:
      "Yes, starting this week. Cash of 60,000 stands against 126,000 of confirmed payables, 32,000 of accrued payroll and 27,000 of provisions, so near-term obligations exceed cash by roughly three to one. A company in that position cannot be governed on monthly reporting, particularly when 90,000 of the cash is customer money and the two events that release it fall in the forecast window.",
    evidence: ["E-11 bank confirmation cash 60,000", "E-06 payables 126,000", "E-07 accrued payroll", "E-09 legal provision"],
    confidence: "high",
  },
  {
    id: "D095",
    category: "board_decision",
    reviewTier: "operational",
    question: "Stop credit sales to insolvent/high-risk customers",
    answer:
      "Yes, and obtain an ageing analysis of the remaining 168,000 immediately. One customer has already failed for 18,000. The Never Call Back channel is collecting at 41 percent against Finally Single's 93 percent, which is a difference no one has explained and for which no ageing data exists in the file. Credit sales should stop to any customer in liquidation or on watch, and the collection plan should start with that channel.",
    evidence: ["E-04 Return R-17", "E-11 liquidator notice", "E-03 CRM WEB-NCB 53,000 open on 90,000 invoiced"],
    confidence: "high",
  },
  {
    id: "D096",
    category: "board_decision",
    reviewTier: "operational",
    question: "Dispose of damaged stock",
    answer:
      "Yes, accept the independent 2,000 disposal quote. The goods have no saleable value, three independent sources confirm it, and continuing to store unsaleable wet stock costs warehouse space while keeping a worthless asset on the books. The 2,000 is provided for at 31 August, so the disposal itself will not hit the next period's profit. Before disposal, confirm no insurance claim is available, since the loss arose from a leaking pipe and no policy appears anywhere in the data room.",
    evidence: ["E-05 basement stock unsaleable, disposal quote 2,000", "E-11 independent stock assessment", "E-02 no insurance line"],
    confidence: "high",
  },
  {
    id: "D097",
    category: "board_decision",
    reviewTier: "operational",
    question: "Investigate management override and duplicate sources",
    answer:
      "Yes, commission an independent investigation. The evidence of override is not circumstantial: formulas were replaced with values in the management workbook, the word probable was to be deleted from a legal opinion, a loan was to be relabelled as income because it sounded optimistic, the same 110,000 appears under three names across three files, capitalisation errors run in both directions, and the evidence files themselves contain a sentence instructing the reader to report a profit of 312,000. The overstatement ran in one direction on nine separate occasions, which is a pattern rather than carelessness. The investigation should cover the duplicate sources in the CRM, where one customer is recorded under three names, since that is the weakness that would conceal fictitious revenue.",
    evidence: ["E-01 'Some formulas were replaced with values'", "E-10 all three pages", "E-07 duplicate founder bonus", "E-03 customer naming inconsistencies"],
    confidence: "high",
  },
  {
    id: "D098",
    category: "board_decision",
    reviewTier: "operational",
    question: "Renegotiate supplier terms",
    answer:
      "Yes. 126,000 is owed to four suppliers whose balances are independently confirmed, against 60,000 of cash of which 90,000 is not really the company's to spend. Event Things Europe is the priority at 59,000 outstanding, and the relationship already shows strain in the payment pattern. Extending terms is the cheapest available source of liquidity and is preferable to drawing further on a facility that already stands at 131,000 with interest in arrears.",
    evidence: ["E-06 unpaid balances 126,000", "E-02 supplier payment lines", "E-11 bank confirmation loan 131,000 and interest unpaid 2,000"],
    confidence: "medium",
  },
  {
    id: "D099",
    category: "board_decision",
    reviewTier: "operational",
    question: "Continue core Finally Single and event operations",
    answer:
      "Yes, continue. The operations are sound even though the reporting was not: 960,000 of delivered and accepted revenue, a 50 percent gross margin, four contract customers with signed acceptances, supplier balances that confirm, a bank that reconciles to the euro and an honest warehouse count. The 240,000 profit gap is classification choices and unbooked adjustments, not trading losses, and the business stays profitable across the entire 58,000 to 79,000 uncertainty range. What failed was control, not the product. Completing the two September events is also the fastest route to converting the 90,000 deposit liability into earned revenue.",
    evidence: ["Schedule 1 revenue 960,000", "E-04 signed customer acceptances", "E-06 confirmed supplier balances", "Scenario range 58,000-79,000"],
    confidence: "high",
  },
  {
    id: "D100",
    category: "board_decision",
    reviewTier: "material_judgment",
    question: "Use claimed management profit for earn-out",
    answer:
      "No. Reject the 312,000 categorically. Any earn-out must be computed on the certified 72,000, with the definition written into the agreement.",
    evidence: ["E-01 management profit 312,000, workbook 'not reconciled'", "Profit bridge, overstatement 240,000", "E-10 embedded instruction to report 312,000"],
    confidence: "high",
    aiProposal:
      "Reject the 312,000 and compute any earn-out on the certified figure. It overstates profit by 240,000, it is contradicted by the bank, and it comes from a workbook that admits its formulas were replaced with values.",
    independentChallenge:
      "The independent analysis agreed and went further on mechanism: because the certified profit itself carries a range of roughly 58,000 to 79,000, a profit-based earn-out would hand both sides an incentive to litigate the judgments in this very report. It recommended the board consider a cash-and-working-capital mechanism instead, and noted that the management figure is arithmetically incapable of being reproduced from the underlying records.",
    studentReasoning:
      "I accept the stronger recommendation. Rejecting 312,000 is straightforward, since it contains 90,000 of undelivered events, 50,000 of borrowed money, no depreciation, no bad debt, no stock write-off, no provision and no interest. The harder and more useful point is the one I had not made: substituting my own 72,000 into the same profit-based mechanism would make every judgment in this report a contractual battleground, including the 9,000 inventory contradiction I could not close and the 110,000 presentation choice that moves headline profit by 110,000 without changing equity at all. Cash and working capital are observable and confirmable by third parties, which is exactly what profit in this company has proved not to be. I recommend the board price on the certified accounts and structure the earn-out on cash.",
    statementEffect: { profit: null, cash: null, assets: null, liabilities: null, equity: null },
    changedFromAI: false,
  },
];

export const decisionStats = {
  total: decisions.length,
  operational: decisions.filter((d) => d.reviewTier === "operational").length,
  materialJudgment: decisions.filter((d) => d.reviewTier === "material_judgment").length,
  changed: decisions.filter((d) => d.changedFromAI === true).length,
  disagreements: decisions.filter((d) => d.agentsDisagreed === true).length,
  lowConfidence: decisions.filter((d) => d.confidence === "low").length,
};
