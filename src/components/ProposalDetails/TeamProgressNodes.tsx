import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react';
import clsx from 'clsx';

type Status = 'not-started' | 'in-progress' | 'completed' | 'rejected';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignedTo: string;
}

interface TeamNode {
  id: string;
  name: string;
  status: Status;
  progress: number;
  checklist: { id: string; task: string; completed: boolean; }[];
}

interface TeamProgressNodesProps {
  nodes: TeamNode[];
}

const statusStyles = {
  completed: {
    bg: 'bg-green-500',
    text: 'text-green-800',
    bgLight: 'bg-green-100',
    icon: 'text-green-500',
  },
  'in-progress': {
    bg: 'bg-yellow-500',
    text: 'text-yellow-800',
    bgLight: 'bg-yellow-100',
    icon: 'text-yellow-500',
  },
  'not-started': {
    bg: 'bg-gray-300',
    text: 'text-gray-800',
    bgLight: 'bg-gray-100',
    icon: 'text-gray-400',
  },
} as const;

export function TeamProgressNodes({ nodes }: TeamProgressNodesProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="py-8">
      {/* Rest of your component code */}
    </div>
  );
} 