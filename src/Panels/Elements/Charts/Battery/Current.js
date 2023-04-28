import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Battery Current',
      position: 'bottom',
    },
  },
};

const labels = Array.from({ length: 30 }, (_, i) => i + 1);

export const data = {
  labels,
  datasets: [
    {
      label: 'Battery Current',
      data: labels.map(() => faker.datatype.number({ min: -4, max: 8 })),
      borderColor: '#23dd96',
      backgroundColor: '#25c6db',
    }
  ],
};

export function Voltage() {
//Return the line chart, including the definition of the chart's axis

  return <Line style={{height: "250px", width: "400px"}} options={options} data={data} />;

}
