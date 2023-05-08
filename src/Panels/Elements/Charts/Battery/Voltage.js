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
import './Voltage.css'

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
      text: 'Battery Voltage',
      position: 'bottom',
    },
  },
};

const labels = Array.from({ length: 30 }, (_, i) => i + 1);

export const data = {
  labels,
  datasets: [
    {
      label: 'Battery Voltage',
      data: labels.map(() => faker.datatype.number({ min: 14, max: 16.8})),
      borderColor: '#23dd96',
      backgroundColor: '#25c6db',
    },
    {
      type: 'line',
      label: 'My Line',
      data: labels.map(() => 14.6), //Use emergency treshold here
      fill: false,
      borderColor: '#FF0000',
      borderWidth: 1,
      pointRadius: 0,
      borderDash: [10,5]
    }
  ],
};

export function Voltage() {
//Return the line chart, including the definition of the chart's axis

  return <Line className="voltage" style={{height: "250px", width: "400px"}} options={options} data={data} />;

}
