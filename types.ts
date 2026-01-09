export enum ProcessDomain {
  GOVERNANCE = '1.3',
  FINANCE = '4.1'
}

export interface DomainConfig {
  id: ProcessDomain;
  title: string;
  subtitle: string;
  focus: string;
  description: string;
  inputs: string[];
  tools: string[];
  outputs: string[];
  color: string;
}

export interface GenerationRequest {
  domain: ProcessDomain;
  context: string;
}

export interface ITTOResponse {
  markdown: string;
}
