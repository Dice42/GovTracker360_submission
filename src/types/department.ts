export interface Department {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  progress: {
    requirementsSubmitted: boolean;
    documentsSubmitted: boolean;
    timelineSubmitted: boolean;
    progress: number;
  };
  reviewedBy?: string;
  comments?: string;
  reviewDate?: string;
  documents?: Array<{
    name: string;
    size: string;
    type: string;
    uploadedBy: string;
    uploadDate: string;
  }>;
  requirements?: Array<{
    id: string;
    title: string;
    status: 'completed' | 'pending' | 'not-required';
    description: string;
  }>;
}

export const DEPARTMENT_TYPES = {
  PROJECTS_INITIATIVES: 'Projects & Initiatives',
  POLICIES_STRATEGIES: 'Policies & Strategies',
  GOVERNANCE_LEGISLATION: 'Governance & Legislation',
  INFRASTRUCTURE: 'Infrastructure & Assets',
  HUMAN_CAPITAL: 'Human Capital',
  FINANCIAL_REQUESTS: 'Financial Requests',
  REPORTS_STUDIES: 'Reports & Studies'
} as const;

export type DepartmentType = typeof DEPARTMENT_TYPES[keyof typeof DEPARTMENT_TYPES];

export interface RequestRequirement {
  id: string;
  type: 'mandatory' | 'optional';
  status: 'completed' | 'pending' | 'not-required';
  title: string;
  description: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
    uploadedBy: string;
    uploadDate: string;
  }>;
} 