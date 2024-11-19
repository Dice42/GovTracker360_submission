import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { MoreVertical } from 'lucide-react';

interface Request {
  id: string;
  trackingNumber: string;
  title: string;
  submissionDate: Date;
  status: 'not-started' | 'in-progress' | 'completed';
}

const mockRequests: Request[] = [
  {
    id: '1',
    trackingNumber: 'REQ-2024-001',
    title: 'Budget Approval for Q2',
    submissionDate: new Date(),
    status: 'not-started',
  },
  {
    id: '2',
    trackingNumber: 'REQ-2024-002',
    title: 'Strategic Planning Review',
    submissionDate: new Date(),
    status: 'in-progress',
  },
  {
    id: '3',
    trackingNumber: 'REQ-2024-003',
    title: 'Operations Assessment',
    submissionDate: new Date(),
    status: 'completed',
  },
];

const statusStyles = {
  'not-started': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-green-100 text-green-800',
};

const statusLabels = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'completed': 'Completed',
};

export function RequestsTable() {
  return (
    <div className="dir-rtl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-blue-600 w-[150px] text-center">
              رقم الطلب
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 w-[200px] text-center">
              نوع الطلب
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 w-[200px] text-center">
              تاريخ التقديم
            </th>
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 w-[150px] text-center">
              الحالة
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-[100px]">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {mockRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50 transition-colors">
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                <Link to={`/external/request/${request.id}`} className="text-blue-600 hover:text-blue-800">
                  {request.trackingNumber}
                </Link>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
                {request.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                {format(request.submissionDate, 'MMM d, yyyy')}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                <span className={clsx(
                  'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                  statusStyles[request.status]
                )}>
                  {statusLabels[request.status]}
                </span>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button className="text-gray-400 hover:text-[#FFA726] transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}