import React from 'react';
import { X, CheckCircle2, Clock, AlertCircle, FileText, User, Calendar } from 'lucide-react';

interface DepartmentDetail {
  id: string;
  name: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  reviewedBy?: string;
  comments?: string;
  reviewDate?: string;
  documents?: {
    name: string;
    size: string;
    type: string;
    uploadedBy: string;
    uploadDate: string;
  }[];
  activities?: {
    id: string;
    action: string;
    user: string;
    date: string;
    details?: string;
  }[];
  requirements?: {
    id: string;
    title: string;
    status: 'completed' | 'pending' | 'not-required';
    description: string;
  }[];
}

interface DepartmentDetailsModalProps {
  department: DepartmentDetail;
  isOpen: boolean;
  onClose: () => void;
}

export function DepartmentDetailsModal({ department, isOpen, onClose }: DepartmentDetailsModalProps) {
  if (!isOpen) return null;

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'approved':
        return 'status-badge-success';
      case 'in-review':
        return 'status-badge-warning';
      case 'rejected':
        return 'status-badge-error';
      default:
        return 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]';
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] bg-opacity-75 z-50 flex-center">
      <div className="bg-[var(--bg-primary)] rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-primary)]">
          <div>
            <h2 className="text-xl font-[var(--font-semibold)] text-[var(--text-primary)]">{department.name}</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Department Review Details</p>
          </div>
          <button
            onClick={onClose}
            className="icon-button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-129px)]">
          {/* Status Section */}
          <div className="mb-8">
            <h3 className="section-title">Current Status</h3>
            <div className="flex items-center space-x-2">
              {department.status === 'approved' && <CheckCircle2 className="h-5 w-5 text-[var(--status-success)]" />}
              {department.status === 'in-review' && <Clock className="h-5 w-5 text-[var(--status-warning)]" />}
              {department.status === 'rejected' && <AlertCircle className="h-5 w-5 text-[var(--status-error)]" />}
              {department.status === 'pending' && <Clock className="h-5 w-5 text-[var(--text-light)]" />}
              <span className={`status-badge ${getStatusStyles(department.status)}`}>
                {department.status.charAt(0).toUpperCase() + department.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Review Information */}
          {(department.reviewedBy || department.reviewDate) && (
            <div className="mb-8">
              <h3 className="section-title">Review Information</h3>
              <div className="card bg-[var(--bg-secondary)]">
                {department.reviewedBy && (
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-[var(--text-light)] mr-2" />
                    <span className="text-sm text-[var(--text-secondary)]">Reviewed by: {department.reviewedBy}</span>
                  </div>
                )}
                {department.reviewDate && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-[var(--text-light)] mr-2" />
                    <span className="text-sm text-[var(--text-secondary)]">Review Date: {department.reviewDate}</span>
                  </div>
                )}
                {department.comments && (
                  <div className="text-sm text-[var(--text-secondary)]">
                    <p className="font-[var(--font-medium)] mb-1">Comments:</p>
                    <p>{department.comments}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Requirements Checklist */}
          {department.requirements && (
            <div className="mb-8">
              <h3 className="section-title">Requirements Checklist</h3>
              <div className="space-y-4">
                {department.requirements.map((req) => (
                  <div key={req.id} className="card bg-[var(--bg-secondary)]">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {req.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-[var(--status-success)]" />}
                        {req.status === 'pending' && <Clock className="h-5 w-5 text-[var(--status-warning)]" />}
                        {req.status === 'not-required' && <AlertCircle className="h-5 w-5 text-[var(--text-light)]" />}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-[var(--font-medium)] text-[var(--text-primary)]">{req.title}</p>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">{req.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {department.documents && department.documents.length > 0 && (
            <div className="mb-8">
              <h3 className="section-title">Related Documents</h3>
              <ul className="divide-y divide-[var(--border-primary)] border border-[var(--border-primary)] rounded-lg">
                {department.documents.map((doc, index) => (
                  <li key={index} className="flex items-center justify-between py-3 px-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[var(--text-light)] mr-3" />
                      <div>
                        <p className="text-sm font-[var(--font-medium)] text-[var(--text-primary)]">{doc.name}</p>
                        <p className="text-xs text-[var(--text-tertiary)]">
                          {doc.uploadedBy} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <button className="btn-secondary">
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Activity Timeline */}
          {department.activities && department.activities.length > 0 && (
            <div>
              <h3 className="section-title">Activity Timeline</h3>
              <div className="flow-root">
                <ul role="list" className="-mb-8">
                  {department.activities.map((activity, index) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {department.activities && index !== department.activities.length - 1 && (
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-[var(--border-primary)]"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-[var(--color-primary-light)] flex-center ring-8 ring-[var(--bg-primary)]">
                              <Clock className="h-5 w-5 text-[var(--color-primary)]" />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-[var(--text-primary)]">{activity.action}</p>
                              {activity.details && (
                                <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{activity.details}</p>
                              )}
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-[var(--text-tertiary)]">
                              <time dateTime={activity.date}>{activity.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 