function runComplianceAgent(inputs) {
  // inputs: issues (number), severity (1-10), past_audits (number)
  const issues = Number(inputs.issues || 0);
  const severity = Number(inputs.severity || 3);
  const past = Number(inputs.past_audits || 1);

  // Example: 2 issues -> revenue ↓8%, workload ↑12%, trust ↓15%
  let revenue_drop = Math.round(issues * 4 * (severity / 3));
  let workload_increase = Math.round(issues * 6 * (severity / 3));
  let trust_drop = Math.round(issues * 7 * (severity / 3));

  const narrative = `Compliance check: ${issues} issues, severity ${severity} -> revenue drop ~${revenue_drop}%`;
  const recommendation = 'Conduct internal audit and remediate issues immediately.';

  return { revenue_drop, workload_increase, trust_drop, narrative, recommendation, agent: 'compliance' };
}

module.exports = { runComplianceAgent };
