import { DomainConfig, ProcessDomain } from './types';
import { ShieldCheck, TrendingUp } from 'lucide-react';

export const DOMAINS: Record<ProcessDomain, DomainConfig> = {
  [ProcessDomain.GOVERNANCE]: {
    id: ProcessDomain.GOVERNANCE,
    title: '1.3 Governance',
    subtitle: 'Plan Sourcing Strategy',
    focus: 'Focus on decision-making, procurement logic, and value protection.',
    description: 'Establish the framework for how the project will be directed and controlled, specifically regarding sourcing and procurement decisions.',
    inputs: ['Project Charter', 'Governance Framework', 'Sourcing Policies'],
    tools: ['Sourcing Logic', 'Make-or-Buy Analysis', 'AI-driven Market Research'],
    outputs: ['Sourcing Strategy', 'Source Selection Criteria'],
    color: 'bg-indigo-600',
  },
  [ProcessDomain.FINANCE]: {
    id: ProcessDomain.FINANCE,
    title: '4.1 Finance',
    subtitle: 'Plan Financial Management',
    focus: 'Focus on funding limits, financial modeling, and cost baselines.',
    description: 'Determine how the budget will be estimated, budgeted, managed, monitored, and controlled.',
    inputs: ['Business Case', 'Benefits Management Plan', 'Project Charter'],
    tools: ['Financial Modeling (NPV/IRR)', 'Funding Limit Reconciliation', 'Financing'],
    outputs: ['Financial Management Plan', 'Funding Requirements'],
    color: 'bg-emerald-600',
  }
};
