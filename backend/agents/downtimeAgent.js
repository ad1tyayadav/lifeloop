function runDowntimeAgent(inputs) {
  // inputs: uptime_pct (0-100), tickets, satisfaction, historical_downtime
  const uptime = Number(inputs.uptime_pct ?? 99);
  const tickets = Number(inputs.tickets || 3);
  const satisfaction = Number(inputs.satisfaction || 85);
  const hist = Number(inputs.historical_downtime || 0);

  // Example mapping: 98% uptime -> revenue ↓5%, workload ↑10%, trust ↓7%
  let revenue_drop = 0;
  let workload_increase = 0;
  let trust_drop = 0;

  if (uptime < 99) {
    const deficit = 100 - uptime; // e.g., 2
    revenue_drop = Math.round(deficit * 2.5); // 2 -> 5%
    workload_increase = Math.round(deficit * 5); // 2 -> 10%
    trust_drop = Math.round(deficit * 3.5); // 2 -> 7%
  }

  const narrative = `Downtime assessment: uptime ${uptime}% -> revenue drop ~${revenue_drop}%`;
  const recommendation = 'Send client update and add backup servers.';

  return { revenue_drop, workload_increase, trust_drop, narrative, recommendation, agent: 'downtime' };
}

module.exports = { runDowntimeAgent };
