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


export function Voltage(params) {
  var voltages = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8];
  var labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [voltageTreshold, setVoltageTreshold] = useState(null);
  //const [voltages, setVoltages] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9, 8]);
  //const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    if (params.data) {
      voltages.push(params.data.system.voltage);
      labels.push(labels.length + 1)
      setVoltageTreshold(params.data.config.emergency_voltage_thres)
    }
    //Return the line chart, including the definition of the chart's axis
  }, [params.data])

  var data = {
    labels,
    datasets: [
      {
        label: 'Battery Voltage',
        data: voltages,
        borderColor: '#23dd96',
        backgroundColor: '#25c6db',
      },
      {
        type: 'line',
        label: 'My Line',
        data: voltages.map(() => voltageTreshold), //Use emergency treshold here
        fill: false,
        borderColor: '#FF0000',
        borderWidth: 1,
        pointRadius: 0,
        borderDash: [10, 5]
      }
    ],
  };


  return <Line className="voltage" style={{ height: "100%", width: "100%" }} options={options} data={data} />;

}
