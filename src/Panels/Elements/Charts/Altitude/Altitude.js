import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  useStatStyles,
} from '@chakra-ui/react'
import React , {useEffect, useState} from 'react';
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



export function Altitude(props) {

  const [alt, setData] = useState([200,220,240,260,280,300,320,340,360,380]);
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [time, setTime]=useState([1,2,3,4,5,6,7,8,9,10])
  //Return the line chart, including the definition of the chart's axis
  useEffect(() => {
    if (props.data) {
      setData([...alt, props.data.navigation.altitude])
      setLabels([...labels, labels.length + 1])
      setTime([...time, props.data.system.run_time])
    }
    //Return the line chart, including the definition of the chart's axis
  }, [props.data])


  var data = {
    labels,
    datasets: [
      {
        label: 'Altitude',
        data: alt,
        borderColor: '#23dd96',
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }
    ],
  };


  //Get average of last 30 values of the alt

  return <>
    <Stat>
      <StatLabel>Altitude</StatLabel>
      <StatNumber>670m</StatNumber>
      <StatHelpText>
        <StatArrow type='decrease' />
        {alt.length>31?   (alt[alt.length - 31]-alt[alt.length - 1])/(time[time.length-31]-time[time.length-1]) + " m/s" : "Not enough data" }
      </StatHelpText>
    </Stat>   
    <Line style={{ height: "250px", width: "400px" }} options={options} data={data} />
  </>

}
