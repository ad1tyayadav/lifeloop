const { runChurnAgent } = require('./churnAgent');
const { runDowntimeAgent } = require('./downtimeAgent');
const { runComplianceAgent } = require('./complianceAgent');

function orchestrate(inputs) {
  // inputs contains event_type and data
  const event = inputs.event_type || 'generic';
  const data = inputs.data || {};

  const churn = runChurnAgent(data);
  const down = runDowntimeAgent(data);
  const comp = runComplianceAgent(data);

  // weight agent that matches event_type higher
  const agents = [churn, down, comp];
  const weighted = agents.map(a => {
    const weight = (a.agent === event) ? 1.5 : 1.0;
    return Object.assign({}, a, { weighted_revenue: Math.round((a.revenue_drop || 0) * weight) });
  });

  // aggregate
  let revenue_drop = 0; let workload_change = 0; let trust_drop = 0;
  const perAgent = [];
  agents.forEach(a => {
    const w = (a.agent === event) ? 1.5 : 1.0;
    const rd = Math.round((a.revenue_drop || 0) * w);
    const wc = Math.round((a.workload_change || a.workload_increase || 0) * w);
    const td = Math.round((a.trust_drop || 0) * w);
    revenue_drop += rd;
    workload_change += wc;
    trust_drop += td;
    perAgent.push({ agent: a.agent, revenue_drop: rd, workload_change: wc, trust_drop: td, narrative: a.narrative, recommendation: a.recommendation });
  });

  // normalize (average)
  revenue_drop = Math.round(revenue_drop / agents.length);
  workload_change = Math.round(workload_change / agents.length);
  trust_drop = Math.round(trust_drop / agents.length);

  const report = {
    revenue_drop, workload_change, trust_drop,
    perAgent,
    human_readable: `Loop Report: revenue ${revenue_drop}%, workload ${workload_change}%, trust ${trust_drop}%`,
  };

  return report;
}

module.exports = { orchestrate };
