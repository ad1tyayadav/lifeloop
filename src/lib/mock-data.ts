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
