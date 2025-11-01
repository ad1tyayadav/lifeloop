export const mockSimulationResponse = {
  impact: {
    revenueDrop: 12,
    workloadIncrease: 25, 
    trustDecline: 8
  },
  report: "15 suspicious transactions detected across 3 accounts during the market volatility event",
  suggestion: "Revenue expected to drop 12%. Prioritize retention programs.",
  details: {
    transactionsAnalyzed: 2847,
    suspiciousCount: 15,
    riskLevel: "High",
  },
};

export const mockEvents = [
  {
    id: "event1",
    label: "Event 1 - Market Crash",
    description: "Analyze during market volatility",
  },
  {
    id: "event2",
    label: "Event 2 - Fraud Detection",
    description: "Identify suspicious patterns",
  },
  {
    id: "event3",
    label: "Event 3 - Anomaly Detection",
    description: "Find unusual transactions",
  },
];

export const mockHistory = [
  {
    id: "1",
    date: "2024-01-15T10:30:00Z",
    eventType: "Revenue Shock Simulation",
    question: "Analyze trading patterns during volatility",
    fileName: "transactions_q1_2024.csv",
    result: {
      riskLevel: "Critical Zone",
      suspiciousCount: 15,
      transactionsAnalyzed: 2847,
    },
  },
  {
    id: "2",
    date: "2024-01-14T14:20:00Z",
    eventType: "Integrity Breach Scan",
    question: "Identify unusual withdrawal patterns",
    fileName: "bank_statements_jan.csv",
    result: {
      riskLevel: "Caution Layer",
      suspiciousCount: 8,
      transactionsAnalyzed: 1562,
    },
  },
  {
    id: "3",
    date: "2024-01-12T09:15:00Z",
    eventType: "Anomaly Detection",
    question: "Find outlier transactions in Q4 2023",
    fileName: "q4_2023_transactions.csv",
    result: {
      riskLevel: "Stable Zone",
      suspiciousCount: 3,
      transactionsAnalyzed: 892,
    },
  },
];
