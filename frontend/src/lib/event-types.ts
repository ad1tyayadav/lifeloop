export const EVENT_TYPES = {
  'event1': 'Revenue Shock Simulation',
  'event2': 'Integrity Breach Scan', 
  'event3': 'System Drift Analysis',
  'Client Churn': 'Client Churn',
} as const;

export type EventType = keyof typeof EVENT_TYPES;

export const getEventTitle = (eventType: string): string => {
  return EVENT_TYPES[eventType as EventType] || eventType;
};

export const getEventOptions = () => {
  return Object.entries(EVENT_TYPES).map(([value, label]) => ({
    value,
    label,
  }));
};