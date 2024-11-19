import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import type { FormData as FormData } from '../types/type';

const mockRequests = await fetch('http://127.0.0.1:8000/proposal', {
  method: 'POST'
}).then(res => res.json());

const statusStyles = {
  'not-started': 'bg-[#2D2D2D] text-gray-300',
  'in-progress': 'bg-[#FFA726]/20 text-[#FFA726]',
  'completed': 'bg-green-900/20 text-green-400',
};

const priorityStyles = {
  high: 'bg-red-900/20 text-red-400',
  medium: 'bg-[#FFA726]/20 text-[#FFA726]',
  low: 'bg-green-900/20 text-green-400',
};

const statusLabels = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'completed': 'Completed',
};

export function RequestsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#404040]">
        <thead className="bg-[#2D2D2D]">
          <tr>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
              Reference No.
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
              External Entity
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
              Title
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
              Submission Date
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
              Priority
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
              Progress
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#404040] bg-[#1E1E1E]">
          {mockRequests.map((request: FormData) => (
            <tr key={request.sn} className="hover:bg-[#2D2D2D] transition-colors">
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                <Link to={`/internal/proposal/${request.title}`} className="text-[#FFA726] hover:text-[#F57C00]">
                  {request.id}
                </Link>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-white">
                {request.externalEntity}
              </td>
              <td className="px-3 py-4 text-sm text-center text-white">
                {request.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-400">
                {format(request.submissionDate, 'MMM d, yyyy')}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                <span className={clsx(
                  'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  priorityStyles[request.priority as keyof typeof priorityStyles]
                )}>
                  {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                <span className={clsx(
                  'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                  statusStyles[request.status as keyof typeof statusStyles]
                )}>
                  {statusLabels[request.status as keyof typeof statusLabels]}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                <div className="flex items-center justify-center">
                  <div className="w-24 bg-[#2D2D2D] rounded-full h-2.5">
                    <div
                      className="bg-[#FFA726] h-2.5 rounded-full"
                      style={{ width: `${(request.tasksCompleted / request.totalTasks) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2">
                    {request.tasksCompleted}/{request.totalTasks}
                  </span>
                </div>
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