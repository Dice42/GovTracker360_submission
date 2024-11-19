export enum DocumentStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  ARCHIVED = 'archived',
  DRAFT = 'draft'
}

export interface DocumentStyle {
  color: string;          // Status-based color
  hoverColor?: string;    // Color on hover
  size?: number;          // Node size
}

export interface ResearchDocument {
  id: string;
  title: string;
  url?: string;
  
  // Department and Status
  departmentName: string;
  status: DocumentStatus;
  
  // Node visualization
  style?: DocumentStyle;
  
  // Detailed content for click events
  description?: string;
  lastUpdated?: Date;
  author?: string;
  metadata?: Record<string, any>;
  
  // Node connections
  connectedDocuments?: string[];
  parentDocumentId?: string;
  childDocumentIds?: string[];
} 