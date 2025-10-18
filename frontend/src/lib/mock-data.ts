export const mockSimulationResponse = {
  result:
    "15 suspicious transactions detected across 3 accounts during the market volatility event",
  suggestion:
    "Consider investigating accounts ACC-2847, ACC-5921, and ACC-7634. These accounts show unusual trading patterns that deviate from their historical behavior by 340%.",
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
    eventType: "Market Crash",
    question: "Analyze trading patterns during volatility",
    fileName: "transactions_q1_2024.csv",
    result: {
      riskLevel: "High",
      suspiciousCount: 15,
      transactionsAnalyzed: 2847,
    },
  },
  {
    id: "2",
    date: "2024-01-14T14:20:00Z",
    eventType: "Fraud Detection",
    question: "Identify unusual withdrawal patterns",
    fileName: "bank_statements_jan.csv",
    result: {
      riskLevel: "Medium",
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
      riskLevel: "Low",
      suspiciousCount: 3,
      transactionsAnalyzed: 892,
    },
  },
];
