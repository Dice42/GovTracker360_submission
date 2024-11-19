import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { DepartmentDetailsModal } from './DepartmentDetailsModal';

interface Department {
  id: string;
  name: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  reviewedBy?: string;
  comments?: string;
  reviewDate?: string;
}

interface DepartmentProgressProps {
  departments: Department[];
}

export function DepartmentProgress({ departments }: DepartmentProgressProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const getStatusIcon = (status: Department['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Department['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'in-review':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'rejected':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-gray-50 text-gray-600 ring-gray-500/10';
    }
  };

  return (
    <>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {departments.map((department, index) => (
            <li key={department.id}>
              <div className="relative pb-8">
                {index !== departments.length - 1 && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-white">
                      {getStatusIcon(department.status)}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900">
                        {department.name}
                        <span className={clsx(
                          'ml-2.5 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                          getStatusColor(department.status)
                        )}>
                          {department.status.charAt(0).toUpperCase() + department.status.slice(1)}
                        </span>
                      </p>
                      {department.comments && (
                        <p className="mt-1 text-sm text-gray-500">{department.comments}</p>
                      )}
                      <button
                        onClick={() => setSelectedDepartment(department)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                      >
                        View Details
                      </button>
                    </div>
                    {department.reviewDate && (
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={department.reviewDate}>
                          {department.reviewedBy && `Reviewed by ${department.reviewedBy}`}
                          <br />
                          {department.reviewDate}
                        </time>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedDepartment && (
        <DepartmentDetailsModal
          department={selectedDepartment}
          isOpen={!!selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </>
  );
} 