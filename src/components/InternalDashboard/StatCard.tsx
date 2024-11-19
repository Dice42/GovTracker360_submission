import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={clsx(
          'ml-2 text-sm font-medium',
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        )}>
          <span className="flex items-center">
            {trend === 'up' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
            {change}
          </span>
        </span>
      </div>
    </div>
  );
} 