import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../../utils/chartConfig';

export function PriorityChart() {
  const data = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [35, 45, 20],
      backgroundColor: [
        'rgb(239, 68, 68)',
        'rgb(234, 179, 8)',
        'rgb(34, 197, 94)'
      ],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  };

  return <Doughnut data={data} options={options} />;
} 