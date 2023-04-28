import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
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
      text: 'Altitude',
      position: 'bottom',
    },
  },
};

const labels = Array.from({ length: 30 }, (_, i) => i + 1);

export const data = {
  labels,
  datasets: [
    {
      label: 'Altitude',
      data: labels.map(() => faker.datatype.number({ min: 50, max: 600 })),
      borderColor: '#23dd96',
      backgroundColor: '#25c6db',
    }
  ],
};

export function Altitude() {
  //Return the line chart, including the definition of the chart's axis

  return <>
    <Stat>
      <StatLabel>Altitude</StatLabel>
      <StatNumber>670m</StatNumber>
      <StatHelpText>
        <StatArrow type='increase' />
        2.3m/s
      </StatHelpText>
    </Stat>   
    <Line style={{ height: "250px", width: "400px" }} options={options} data={data} />;
  </>

}
