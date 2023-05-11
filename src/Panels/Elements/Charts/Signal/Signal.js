import React, { useEffect, useState } from 'react';
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
      text: 'Signal Strength',
      position: 'bottom',
    },
  },
};


export function Signal(params) {

  
  const [dataset, setData] = useState([99,98,12,88,55,44,33,22,11,10]);
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    if (params.data) {
      setData([...dataset, params.data.system.signal_strength])
      setLabels([...labels, labels.length + 1])
    }
    //Return the line chart, including the definition of the chart's axis
  }, [params.data])

  var data = {
    labels,
    datasets: [
      {
        label: 'Signal Strength',
        data: dataset,
        borderColor: '#23dd96',
        backgroundColor: '#25c6db',
      },
    ],
  };


  return <Line className="signal" style={{ height: "250px", width: "400px" }} options={options} data={data} />;

}
