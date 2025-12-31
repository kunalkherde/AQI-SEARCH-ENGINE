import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Pollutant } from '../types/aqi.types'; // Import the type

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  pollutants: Pollutant[];
}

const PollutantChart: React.FC<Props> = ({ pollutants }) => {
  const chartData = {
    // Map the names and values from your array
    labels: pollutants.map(p => p.name),
    datasets: [
      {
        label: 'Concentration',
        data: pollutants.map(p => p.value),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Pollutants Overview' },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 h-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PollutantChart;