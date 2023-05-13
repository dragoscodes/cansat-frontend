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
      text: 'Battery Current',
      position: 'bottom',
    },
  },
};


export function Current(params) {

  
  const [dataset, setData] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9, 8]);
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    if (params.data) {
      setData([...dataset, params.data.system.current])
      setLabels([...labels, labels.length + 1])
    }
    //Return the line chart, including the definition of the chart's axis
  }, [params.data])

  var data = {
    labels,
    datasets: [
      {
        label: 'Battery Current',
        data: dataset,
        borderColor: '#23dd96',
        backgroundColor: '#25c6db',
      },
    ],
  };


  return <Line className="current" style={{ height: "100%", width: "100%" }}  options={options} data={data} />;

}
