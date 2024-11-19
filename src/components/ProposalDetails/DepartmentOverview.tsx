import React from 'react';
import { Department } from '../../types/department';
import { TeamProgressNodes } from '../TeamProgressNodes';

// Define the type locally if not exported from TeamProgressNodes
type TeamProgressNode = {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'rejected';
  progress: number;
  checklist: { id: string; task: string; completed: boolean; }[];
}

interface DepartmentOverviewProps {
  department: Department;
  otherDepartmentsProgress: {
    departmentId: string;
    departmentName: string;
    progress: number;
    status: Department['status'];
  }[];
}

export function DepartmentOverview({ department, otherDepartmentsProgress }: DepartmentOverviewProps) {
  const nodes = [
    {
      id: department.id,
      name: department.name,
      status: getNodeStatus(department.status),
      progress: department.progress.progress,
      checklist: [
        { id: 'req', task: 'Requirements Submitted', completed: department.progress.requirementsSubmitted },
        { id: 'doc', task: 'Documents Submitted', completed: department.progress.documentsSubmitted },
        { id: 'time', task: 'Timeline Submitted', completed: department.progress.timelineSubmitted },
      ]
    },
    ...otherDepartmentsProgress.map(dept => ({
      id: dept.departmentId,
      name: dept.departmentName,
      status: getNodeStatus(dept.status),
      progress: dept.progress,
      checklist: []
    }))
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Department Progress Overview</h3>
      <TeamProgressNodes nodes={nodes as TeamProgressNode[]} />
    </div>
  );
}

function getNodeStatus(status: Department['status']): 'completed' | 'in-progress' | 'rejected' {
  switch (status) {
    case 'approved':
      return 'completed';
    case 'rejected':
      return 'rejected';
    case 'pending':
    case 'in-review':
      return 'in-progress';
    default:
      return 'in-progress';
  }
} 