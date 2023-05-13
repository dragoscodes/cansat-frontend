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
      text: 'FC CPU Temperature',
      position: 'bottom',
    },
  },
};


export function FC(params) {

  
  const [dataset, setData] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9, 8]);
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    if (params.data) {
      setData([...dataset, params.data.sensors.flight_controller.cpu_temp])
      setLabels([...labels, labels.length + 1])
    }
    //Return the line chart, including the definition of the chart's axis
  }, [params.data])

  var data = {
    labels,
    datasets: [
      {
        label: 'FC CPU Temperature',
        data: dataset,
        borderColor: '#23dd96',
        backgroundColor: '#25c6db',
      },
      {
        type: 'line',
        label: 'My Line',
        data: dataset.map(() => 14.6), //Use emergency treshold here
        fill: false,
        borderColor: '#FF0000',
        borderWidth: 1,
        pointRadius: 0,
        borderDash: [10, 5]
      }
    ],
  };


  return <Line className="temperature" style={{ height: "250px", width: "400px" }} options={options} data={data} />;

}
