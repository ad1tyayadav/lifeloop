function runChurnAgent(inputs) {
  // inputs: satisfaction (0-100), revenue (number), tickets (number)
  const satisfaction = Number(inputs.satisfaction || 80);
  const revenue = Number(inputs.revenue || 1000);
  const tickets = Number(inputs.tickets || 5);

  const revenue_drop = Math.max(0, Math.round((100 - satisfaction) * 0.05));
  const workload_change = Math.round(tickets * 0.5);
  const trust_drop = Math.round((100 - satisfaction) * 0.03);

  const narrative = `Churn assessment: satisfaction ${satisfaction} -> revenue drop ~${revenue_drop}% and trust drop ~${trust_drop}%`;
  const recommendation = 'Improve customer success outreach and reduce ticket backlog.';

  return { revenue_drop, workload_change, trust_drop, narrative, recommendation, agent: 'churn' };
}

module.exports = { runChurnAgent };
